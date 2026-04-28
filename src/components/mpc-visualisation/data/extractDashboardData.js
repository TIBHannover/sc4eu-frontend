function nodeById(schema, id) {
  return schema.nodes.find((node) => node.id === id) ?? null;
}

function nodesByPrefix(schema, prefix) {
  return schema.nodes.filter((node) => node.id.startsWith(prefix));
}

function prop(node, propertyName) {
  return node?.properties?.[propertyName] ?? null;
}

// ─── Regional demand ──────────────────────────────────────────────────────────
// Reads totalDemand from CurrentDemand_{surveyType}_{region} nodes.
// Converts raw demand values to percentage share of total.

const REGION_KEYS = {
  Americas:           "Americas",
  Asia_Pacific_China: "Asia-Pacific China",
  Asia_Pacific_Other: "Asia-Pacific Other",
  Europe:             "Europe",
  Japan:              "Japan",
};

function extractRegionalDemand(schema, surveyType) {
  const rawValues = {};
  let total       = 0;

  Object.entries(REGION_KEYS).forEach(([regionKey, regionLabel]) => {
    const node  = nodeById(schema, `CurrentDemand_${surveyType}_${regionKey}`);
    const value = prop(node, "totalDemand") ?? 0;
    rawValues[regionLabel] = value;
    total                 += value;
  });

  if (total === 0) {
    // All regions equal if no data found.
    return Object.fromEntries(
      Object.values(REGION_KEYS).map((label) => [label, 20])
    );
  }

  return Object.fromEntries(
    Object.entries(rawValues).map(([label, value]) => [
      label,
      Math.round((value / total) * 100),
    ])
  );
}

function extractShortageData(schema, originId) {
  const shortageNodes = schema.nodes.filter(
    (node) =>
      node.id.startsWith("SemiconductorShortage_Aggregated_") &&
      schema.edges.some(
        (edge) => edge.s === node.id && edge.label === "hasSurveyOrigin" && edge.t === originId
      )
  );

  if (shortageNodes.length === 0) return null;

  const yesNode   = shortageNodes.find((n) => n.id.endsWith("_Yes"));
  const totalNode = shortageNodes.find((n) => n.id.endsWith("_SUM"));

  return {
    yes:   prop(yesNode,   "participantCount") ?? 0,
    total: prop(totalNode, "participantCount") ?? 0,
  };
}

function extractAutonomousDriving(schema) {
  // AutonomousDrivingDevelopment_OEM_BEHV_SAE_Level_1_Year_2026 etc.
  const adNodes = nodesByPrefix(schema, "AutonomousDrivingDevelopment_OEM_");
  if (adNodes.length === 0) return null;

  const result = {};

  adNodes.forEach((node) => {
    // Parse: AutonomousDrivingDevelopment_OEM_{vehicleType}_SAE_Level_{n}_Year_{year}
    const parts = node.id.replace("AutonomousDrivingDevelopment_OEM_", "").split("_");
    if (parts.length < 6) return;

    const vehicleType = parts[0];                          // BEHV, BEV, ICE
    const saeLevel    = `SAE Level ${parts[3]}`;           // SAE Level 1..5
    const year        = parseInt(parts[5], 10);            // 2026, 2027, 2028
    const percentage  = prop(node, "hasPercentage");

    if (!result[vehicleType])            result[vehicleType] = {};
    if (!result[vehicleType][saeLevel])  result[vehicleType][saeLevel] = {};
    result[vehicleType][saeLevel][year] = percentage;
  });

  return Object.keys(result).length > 0 ? result : null;
}

function extractComponentActivity(schema) {
  const componentNodeIds = {
    "ADAS":               "Advanced_driver-assistance_systems_ADAS",
    "Body & Convenience": "Body_and_convenience",
    "Chassis & Safety":   "Chassis_and_safety",
    "Infotainment":       "Infotainment_and_Telematics",
    "Other":              "Other",
    "Powertrain":         "Powertrain",
  };

  const result = {};

  Object.entries(componentNodeIds).forEach(([displayName, nodeId]) => {
    const node = nodeById(schema, nodeId);
    if (!node) return;

    // isActiveInCategory is stored as a JSON-like string: "{'Yes': 1.0, 'No': 0.0, 'SUM': 1.0}"
    const rawValue = prop(node, "isActiveInCategory");
    if (rawValue == null) return;

    // Extract Yes value from the string.
    const yesMatch = String(rawValue).match(/'Yes':\s*([\d.]+)/);
    const yesCount = yesMatch ? parseFloat(yesMatch[1]) : 0;
    result[displayName] = yesCount > 0;
  });

  return Object.keys(result).length > 0 ? result : null;
}

// ─── Future demand quarters ───────────────────────────────────────────────────
// Reads percentageChange from FutureDemand_{surveyType}_{region}_*_Entry nodes
// grouped by quarter.

function extractFutureDemandByRegion(schema, surveyType) {
  const entryNodes = nodesByPrefix(schema, `FutureDemand_${surveyType}_`);
  if (entryNodes.length === 0) return null;

  // Group by quarter — periodLabel stored as property or encoded in node ID.
  const byQuarter = {};

  entryNodes.forEach((node) => {
    const quarterLabel = prop(node, "periodLabel") ?? extractQuarterFromId(node.id);
    const change       = prop(node, "totalDemandPercentageChange");

    if (quarterLabel && change !== null) {
      if (!byQuarter[quarterLabel]) byQuarter[quarterLabel] = [];
      byQuarter[quarterLabel].push(change);
    }
  });

  // Average across regions for each quarter.
  const quarters = Object.entries(byQuarter).map(([label, values]) => ({
    label,
    value: values.reduce((sum, v) => sum + v, 0) / values.length,
  }));

  return {
    currentQtr: quarters[0]?.value ?? null,
    quarters,
  };
}

function extractQuarterFromId(nodeId) {
  // e.g. FutureDemand_OEM_Americas_q2_2026_Entry → "q2 2026"
  const match = nodeId.match(/_([q][\d]_[\d]{4})_/i) ??
                nodeId.match(/_current_quarter_/i);
  if (!match) return null;
  return match[0] === "_current_quarter_"
    ? "Current Quarter"
    : match[1].replace("_", " ");
}

// ─── OEM Survey ───────────────────────────────────────────────────────────────

function extractOemSurvey(schema) {
  const vehicleGroups = ["BEHV", "BEV", "ICE"];

  const bl1 = vehicleGroups.map((vehicleType) => {
    const node = nodeById(schema, `OEMCurrentDemand_${vehicleType}`);
    return prop(node, "percentageChangeBL1");
  });

  const bl2 = vehicleGroups.map((vehicleType) => {
    const node = nodeById(schema, `OEMCurrentDemand_${vehicleType}`);
    return prop(node, "percentageChangeBL2");
  });

  const regionalDemand = extractRegionalDemand(schema, "OEM");

  // Future demand — one entry per vehicle type using Option1 quarterly nodes.
  const futureDemand = {};
  vehicleGroups.forEach((vehicleType) => {
    const quarterNodes = nodesByPrefix(
      schema,
      `OEMFutureDemand_Option1_${vehicleType}_`
    );
    if (quarterNodes.length > 0) {
      futureDemand[vehicleType] = {
        currentQtr: prop(quarterNodes[0], "percentageChange"),
        quarters:   quarterNodes.map((node) => ({
          label: node.label,
          value: prop(node, "percentageChange"),
        })),
      };
    }
  });

  return {
    key:         "oem",
    label:       "OEM Survey",
    subtitle:    "Vehicle Demand",
    description: "OEM monthly survey — vehicle demand by powertrain type vs prior baselines",
    groups:      vehicleGroups,
    bl1,
    bl2,
    regionalDemand,
    futureDemand,
    autonomousDriving: extractAutonomousDriving(schema),
    shortageData:      extractShortageData(schema, "OEM_Survey_Instance"),
  };
}

// ─── Semiconductor Survey ─────────────────────────────────────────────────────

const SEMI_GROUP_TO_NODE_ID = {
  "<=7nm":    "SemiCurrentDemand_%3C%3D_7nm",
  "10-28nm":  "SemiCurrentDemand_10nm_to_%3C28nm",
  "28-45nm":  "SemiCurrentDemand_28nm_to_%3C45nm",
  "55-180nm": "SemiCurrentDemand_55nm_to_180nm",
  ">180nm":   "SemiCurrentDemand_180nm_or_greater",
};

const SEMI_INVENTORY_NODE_PREFIX = {
  "<=7nm":    "lte_7nm",
  "10-28nm":  "10nm_to_%3C28nm",
  "28-45nm":  "28nm_to_%3C45nm",
  "55-180nm": "55nm_to_180nm",
  ">180nm":   "180nm_or_greater",
};

function extractSemiInventoryTrends(schema) {
  const result = {};

  Object.entries(SEMI_INVENTORY_NODE_PREFIX).forEach(([groupName, techFragment]) => {
    // Find nodes like InventoryTrend_Aggregated_Semi_{techFragment}_{Trend}
    // where participantCount > 0.
    const trendNodes = nodesByPrefix(
      schema,
      `InventoryTrend_Aggregated_Semi_${techFragment}_`
    ).filter((node) => !node.id.endsWith("_SUM"));

    // Find the trend with participantCount > 0.
    const dominantTrendNode = trendNodes.find(
      (node) => (prop(node, "participantCount") ?? 0) > 0
    );

    if (dominantTrendNode) {
      // Extract the trend type from the node ID suffix.
      const parts     = dominantTrendNode.id.split("_");
      const trendType = parts[parts.length - 1]; // Increase / Decrease / Stable
      result[groupName] = trendType;
    }
  });

  return result;
}

function extractSemiInventoryTargets(schema) {
  const result = {};

  Object.entries(SEMI_INVENTORY_NODE_PREFIX).forEach(([groupName, techFragment]) => {
    const targetNodes = nodesByPrefix(
      schema,
      `InventoryTarget_Aggregated_Semi_${techFragment}_`
    ).filter((node) => !node.id.endsWith("_SUM"));

    const dominantNode = targetNodes.find(
      (node) => (prop(node, "participantCount") ?? 0) > 0
    );

    if (dominantNode) {
      result[groupName] = prop(dominantNode, "targetIndicatorStatus") ?? dominantNode.label;
    }
  });

  return result;
}

function extractSemiOrderCancellations(schema) {
  const result = {};

  const CANCEL_FRAGMENT = {
    "<=7nm":    "%3C%3D_7nm",
    "10-28nm":  "10nm_to_%3C28nm",
    "28-45nm":  "28nm_to_%3C45nm",
    "55-180nm": "55nm_to_180nm",
    ">180nm":   "180nm_or_greater",
  };

  Object.entries(CANCEL_FRAGMENT).forEach(([groupName, techFragment]) => {
    const cancelNodes = nodesByPrefix(
      schema,
      `OrderCancellation_Aggregated_${techFragment}_`
    ).filter((node) => !node.id.endsWith("_SUM"));

    const dominantNode = cancelNodes.find(
      (node) => (prop(node, "participantCount") ?? 0) > 0
    );

    if (dominantNode) {
      const parts        = dominantNode.id.split("_");
      const responseType = parts[parts.length - 1];
      result[groupName] = responseType;
    }
  });

  return result;
}

function extractSemiconductorSurvey(schema) {
  const semiGroups = Object.keys(SEMI_GROUP_TO_NODE_ID);

  const bl1 = semiGroups.map((group) => {
    const node = nodeById(schema, SEMI_GROUP_TO_NODE_ID[group]);
    return prop(node, "percentageChangeBL1");
  });

  const bl2 = semiGroups.map((group) => {
    const node = nodeById(schema, SEMI_GROUP_TO_NODE_ID[group]);
    return prop(node, "percentageChangeBL2");
  });

  const regionalDemand   = extractRegionalDemand(schema, "Semiconductor");
  const inventoryTrend   = extractSemiInventoryTrends(schema);
  const inventoryTarget  = extractSemiInventoryTargets(schema);
  const orderCancellation = extractSemiOrderCancellations(schema);

  return {
    key:         "semi",
    label:       "Semiconductor",
    subtitle:    "Technology Node Demand",
    description: "Semiconductor supplier survey — demand by process node size vs prior baselines",
    groups:      semiGroups,
    bl1,
    bl2,
    regionalDemand,
    inventoryTrend,
    inventoryTarget,
    orderCancellation,
    shortageData:      extractShortageData(schema, "Semiconductor_Survey_Instance"),
  };
}

// ─── Tier 1 Survey ────────────────────────────────────────────────────────────

const TIER1_COMPONENT_NODE_IDS = [
  "Advanced_driver-assistance_systems_ADAS",
  "Body_and_convenience",
  "Chassis_and_safety",
  "Infotainment_and_Telematics",
  "Other",
  "Powertrain",
];

function extractTier1Survey(schema) {
  const bl1Node = nodeById(schema, "Tier1CurrentDemand_BL1");
  const bl2Node = nodeById(schema, "Tier1CurrentDemand_BL2");

  // Overall BL1/BL2 are percentageChange on the BL1/BL2 analysis nodes.
  const overallBl1 = prop(bl1Node, "percentageChange");
  const overallBl2 = prop(bl2Node, "percentageChange");

  // Component groups from the TTL — use the node label as display name.
  const componentGroups = TIER1_COMPONENT_NODE_IDS
    .map((nodeId) => nodeById(schema, nodeId))
    .filter(Boolean)
    .map((node) => node.label);

  // Each component group shares the survey-level change
  // since the TTL does not break BL1/BL2 down per component.
  const groups  = componentGroups.length > 0 ? componentGroups : ["Automotive"];
  const bl1     = groups.map(() => overallBl1);
  const bl2     = groups.map(() => overallBl2);

  const regionalDemand = extractRegionalDemand(schema, "Tier1");

  // Future demand across quarters.
  const tier1FutureNodes = nodesByPrefix(schema, "Tier1FutureDemand_Option1_");
  const futureDemand     = {};

  if (tier1FutureNodes.length > 0) {
    futureDemand.Automotive = {
      currentQtr: prop(tier1FutureNodes[0], "percentageChange"),
      quarters:   tier1FutureNodes.map((node) => ({
        label: node.label,
        value: prop(node, "percentageChange"),
      })),
    };
  }

  return {
    key:         "tier1",
    label:       "Tier 1 Suppliers",
    subtitle:    "Component Demand",
    description: "Tier 1 supplier survey — component demand and market segment analysis",
    groups,
    bl1,
    bl2,
    regionalDemand,
    futureDemand,
    componentActivity: extractComponentActivity(schema),
shortageData:      extractShortageData(schema, "Tier1_Survey_Instance"),
  };
}

// ─── Main entry point ─────────────────────────────────────────────────────────

export function extractDashboardData(schema) {
  if (!schema?.nodes?.length) return [];

  // Only attempt extraction if this looks like the MPC survey ontology.
  const hasSurveyData = schema.nodes.some(
    (node) =>
      node.id === "OEM_Survey" ||
      node.id === "Semiconductor_Survey" ||
      node.id === "Tier1_Survey"
  );

  if (!hasSurveyData) return [];

  return [
    extractOemSurvey(schema),
    extractSemiconductorSurvey(schema),
    extractTier1Survey(schema),
  ];
}

