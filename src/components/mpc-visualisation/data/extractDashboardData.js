function nodeById(schema, id) {
    return schema.nodes.find(node => node.id === id) ?? null;
}

function nodesByPrefix(schema, prefix) {
    return schema.nodes.filter(node => node.id.startsWith(prefix));
}

function prop(node, propertyName) {
    return node?.properties?.[propertyName] ?? null;
}

// ─── Regional demand ──────────────────────────────────────────────────────────
// Reads totalDemand from CurrentDemand_{surveyType}_{region} nodes.
// Converts raw demand values to percentage share of total.

function resolveQuarterLabel(schema, nodeId) {
    // Follow the forTimePeriod edge (URI reference) to the linked Quarter node
    const edge = schema.edges.find(e => e.s === nodeId && e.label === 'forTimePeriod');
    if (!edge) return null;
    const quarterNode = nodeById(schema, edge.t);
    const raw = prop(quarterNode, 'periodLabel');
    if (!raw) return null;
    // Strip the ontology typo prefix "Uture Demand " present on OEM quarter nodes
    return raw.replace(/^Uture Demand\s*/i, '');
}

const REGION_KEYS = {
    Americas: 'Americas',
    Asia_Pacific_China: 'AP-China',
    Asia_Pacific_Other: 'AP-Other',
    Europe: 'Europe',
    Japan: 'Japan'
};

function extractRegionalDemand(schema, surveyType) {
    const rawValues = {};
    let total = 0;

    Object.entries(REGION_KEYS).forEach(([regionKey, regionLabel]) => {
        const node = nodeById(schema, `CurrentDemand_${surveyType}_${regionKey}`);
        const value = prop(node, 'totalDemand') ?? 0;
        rawValues[regionLabel] = value;
        total += value;
    });

    if (total === 0) {
        return Object.fromEntries(Object.values(REGION_KEYS).map(label => [label, 20]));
    }

    return Object.fromEntries(Object.entries(rawValues).map(([label, value]) => [label, Math.round((value / total) * 100)]));
}

// ─── Shortage ─────────────────────────────────────────────────────────────────

function extractShortageData(schema, originId) {
    const shortageNodes = schema.nodes.filter(
        node =>
            node.id.startsWith('SemiconductorShortage_Aggregated_') &&
            schema.edges.some(edge => edge.s === node.id && edge.label === 'hasSurveyOrigin' && edge.t === originId)
    );

    if (shortageNodes.length === 0) return null;

    const yesNode = shortageNodes.find(n => n.id.endsWith('_Yes'));
    const noNode = shortageNodes.find(n => n.id.endsWith('_No'));

    const yes = prop(yesNode, 'participantCount') ?? 0;
    const no = prop(noNode, 'participantCount') ?? 0;
    // Derive total from yes + no — the _SUM node is unreliable in the ontology
    // (Tier1 SUM = 0 even when yes = 1).
    const total = yes + no;

    return { yes, no, total };
}

// ─── Autonomous driving (OEM) ─────────────────────────────────────────────────
// Returns { BEHV: { 'SAE Level 1': { 2026: 0.22, 2027: ..., 2028: ... }, ... }, BEV: ..., ICE: ... }
// Uses hasPercentage (ratio 0–1), hasSAELevel, hasYear, hasVehicleType on the detail nodes.

function extractAutonomousDriving(schema) {
    const adNodes = nodesByPrefix(schema, 'AutonomousDrivingDevelopment_OEM_');
    if (adNodes.length === 0) return null;

    const result = {};

    adNodes.forEach(node => {
        // ID pattern: AutonomousDrivingDevelopment_OEM_{vehicleType}_SAE_Level_{n}_Year_{year}
        const suffix = node.id.replace('AutonomousDrivingDevelopment_OEM_', '');
        const parts = suffix.split('_');
        if (parts.length < 6) return;

        const vehicleType = parts[0]; // BEHV | BEV | ICE
        const saeLevel = `SAE ${parts[3]}`; // SAE 1 .. SAE 5
        const year = Number.parseInt(parts[5], 10); // 2026 | 2027 | 2028
        const pct = prop(node, 'hasPercentage'); // ratio e.g. 0.22

        if (pct === null) return;

        if (!result[vehicleType]) result[vehicleType] = {};
        if (!result[vehicleType][saeLevel]) result[vehicleType][saeLevel] = {};
        result[vehicleType][saeLevel][year] = Math.round(pct * 100); // store as %
    });

    return Object.keys(result).length > 0 ? result : null;
}

// ─── Future demand — OEM (per vehicle type, 8 quarters) ───────────────────────

function extractOemFutureDemand(schema) {
    const vehicleTypes = ['BEHV', 'BEV', 'ICE'];
    const result = {};

    vehicleTypes.forEach(vt => {
        const nodes = nodesByPrefix(schema, `OEMFutureDemand_Option1_${vt}_`);
        if (nodes.length === 0) return;

        // Sort by quarter label so the line chart is in chronological order.
        const sorted = [...nodes].sort((a, b) => a.id.localeCompare(b.id));
        result[vt] = sorted.map(node => ({
            label: resolveQuarterLabel(schema, node.id) ?? node.label,
            value: prop(node, 'percentageChange')
        }));
    });

    return Object.keys(result).length > 0 ? result : null;
}

// ─── Future demand — Semiconductor (per nm-node, 8 quarters) ─────────────────

const SEMI_NM_DISPLAY = {
    '%3C%3D_7nm': '≤7nm',
    '10nm_to_%3C28nm': '10–28nm',
    '28nm_to_%3C45nm': '28–45nm',
    '55nm_to_180nm': '55–180nm',
    '180nm_or_greater': '≥180nm'
};

function extractSemiFutureDemand(schema) {
    const result = {};

    Object.entries(SEMI_NM_DISPLAY).forEach(([fragment, displayLabel]) => {
        const nodes = nodesByPrefix(schema, `SemiFutureDemand_Option1_${fragment}_`);
        if (nodes.length === 0) return;

        const sorted = [...nodes].sort((a, b) => a.id.localeCompare(b.id));
        result[displayLabel] = sorted.map(node => ({
            label: resolveQuarterLabel(schema, node.id) ?? node.label,
            value: prop(node, 'percentageChange')
        }));
    });

    return Object.keys(result).length > 0 ? result : null;
}

// ─── Future demand — Tier 1 (8 quarters, Automotive segment) ─────────────────
// forTimePeriod is stored as a STRING LITERAL on Tier1 nodes, not a URI.

function extractTier1FutureDemand(schema) {
    const nodes = nodesByPrefix(schema, 'Tier1FutureDemand_Option1_');
    if (nodes.length === 0) return null;

    const sorted = [...nodes].sort((a, b) => a.id.localeCompare(b.id));
    return {
        Automotive: sorted.map(node => ({
            label: prop(node, "forTimePeriod") ?? prop(node, "periodLabel") ?? node.label,
            value: prop(node, 'percentageChange')
        }))
    };
}

// ─── Semiconductor — current demand per nm-node ───────────────────────────────

const SEMI_CURRENT_NODE_IDS = {
    '≤7nm': 'SemiCurrentDemand_%3C%3D_7nm',
    '10–28nm': 'SemiCurrentDemand_10nm_to_%3C28nm',
    '28–45nm': 'SemiCurrentDemand_28nm_to_%3C45nm',
    '55–180nm': 'SemiCurrentDemand_55nm_to_180nm',
    '≥180nm': 'SemiCurrentDemand_180nm_or_greater'
};

const SEMI_GROUPS = ['≤7nm', '10–28nm', '28–45nm', '55–180nm', '≥180nm'];

// ─── Semiconductor — inventory status per nm-node ─────────────────────────────

const SEMI_INVENTORY_FRAGMENT = {
    '≤7nm': 'lte_7nm',
    '10–28nm': '10nm_to_%3C28nm',
    '28–45nm': '28nm_to_%3C45nm',
    '55–180nm': '55nm_to_180nm',
    '≥180nm': '180nm_or_greater'
};

function extractSemiInventoryTrends(schema) {
    const result = {};
    Object.entries(SEMI_INVENTORY_FRAGMENT).forEach(([label, frag]) => {
        const nodes = nodesByPrefix(schema, `InventoryTrend_Aggregated_Semi_${frag}_`).filter(n => !n.id.endsWith('_SUM'));
        const dominant = nodes.find(n => (prop(n, 'participantCount') ?? 0) > 0);
        if (dominant) {
            const parts = dominant.id.split('_');
            result[label] = parts[parts.length - 1]; // Increase | Decrease | Stable
        }
    });
    return result;
}

function extractSemiInventoryTargets(schema) {
    const result = {};
    Object.entries(SEMI_INVENTORY_FRAGMENT).forEach(([label, frag]) => {
        const nodes = nodesByPrefix(schema, `InventoryTarget_Aggregated_Semi_${frag}_`).filter(n => !n.id.endsWith('_SUM'));
        const dominant = nodes.find(n => (prop(n, 'participantCount') ?? 0) > 0);
        if (dominant) {
            result[label] = prop(dominant, 'targetIndicatorStatus') ?? dominant.label;
        }
    });
    return result;
}

function extractSemiOrderCancellations(schema) {
    const CANCEL_FRAGMENT = {
        '≤7nm': '%3C%3D_7nm',
        '10–28nm': '10nm_to_%3C28nm',
        '28–45nm': '28nm_to_%3C45nm',
        '55–180nm': '55nm_to_180nm',
        '≥180nm': '180nm_or_greater'
    };
    const result = {};
    Object.entries(CANCEL_FRAGMENT).forEach(([label, frag]) => {
        const nodes = nodesByPrefix(schema, `OrderCancellation_Aggregated_${frag}_`).filter(n => !n.id.endsWith('_SUM'));
        const dominant = nodes.find(n => (prop(n, 'participantCount') ?? 0) > 0);
        if (dominant) {
            const parts = dominant.id.split('_');
            result[label] = parts[parts.length - 1]; // Increase | Decrease | Stable
        }
    });
    return result;
}

// ─── Tier 1 — EV/non-EV component split ──────────────────────────────────────

function extractComponentSplit(schema) {
    const ev = nodeById(schema, 'EV');
    const nonEv = nodeById(schema, 'non_EV');
    if (!ev && !nonEv) return null;
    return {
        EV: prop(ev, 'splitPercentage') ?? 40,
        'non-EV': prop(nonEv, 'splitPercentage') ?? 60
    };
}

// ─── Tier 1 — inventory trend by component type ───────────────────────────────
// AggregatedTrend_EV_*/non_EV_*/both_* → hasInventoryResponse → Increase/Decrease/Stable

function extractTier1InventoryTrends(schema) {
    const components = ['EV', 'non_EV', 'both'];
    const result = {};

    components.forEach(comp => {
        // Find the trend node where participantCount > 0
        const PREFIX_MAP = { EV: 'EV', non_EV: 'non_EV', both: 'both' };
        const prefix = `AggregatedTrend_${PREFIX_MAP[comp]}_`;
        const nodes = nodesByPrefix(schema, prefix).filter(n => !n.id.endsWith('_SUM'));

        // These nodes only carry hasInventoryResponse (a URI edge), not a literal.
        // We derive the trend from the node ID suffix.
        const dominant = nodes.find(n => {
            const suffix = n.id.replace(prefix, '').toLowerCase();
            return suffix === 'increase' || suffix === 'decrease' || suffix === 'stable';
        });

        if (dominant) {
            const suffix = dominant.id.replace(prefix, '');
            const displayKey = comp === 'non_EV' ? 'non-EV' : comp === 'both' ? 'EV + non-EV' : comp;
            result[displayKey] = suffix; // Increase | Decrease | Stable
        }
    });

    // Also check the richer Decrease/Increase/Stable/Sum nodes which have inventoryTrend literals
    const trendNodes = ['Decrease', 'Increase', 'Stable'].map(t => nodeById(schema, t)).filter(Boolean);
    if (trendNodes.length > 0 && Object.keys(result).length === 0) {
        // Fallback: use inventoryTrend property
        trendNodes.forEach(n => {
            const trend = prop(n, 'inventoryTrend');
            if (trend) result['All components'] = trend;
        });
    }

    return Object.keys(result).length > 0 ? result : null;
}

// ─── Component activity (Tier 1) ─────────────────────────────────────────────

function extractComponentActivity(schema) {
    const componentNodeIds = {
        ADAS: 'Advanced_driver-assistance_systems_ADAS',
        'Body & Convenience': 'Body_and_convenience',
        'Chassis & Safety': 'Chassis_and_safety',
        Infotainment: 'Infotainment_and_Telematics',
        Other: 'Other',
        Powertrain: 'Powertrain'
    };
    const result = {};
    Object.entries(componentNodeIds).forEach(([displayName, nodeId]) => {
        const node = nodeById(schema, nodeId);
        if (!node) return;
        const rawValue = prop(node, 'isActiveInCategory');
        if (rawValue == null) return;
        const yesMatch = String(rawValue).match(/'Yes':\s*([\d.]+)/);
        result[displayName] = yesMatch ? Number.parseFloat(yesMatch[1]) > 0 : false;
    });
    return Object.keys(result).length > 0 ? result : null;
}

// ─── Per-survey extractors ────────────────────────────────────────────────────

function extractOemSurvey(schema) {
    const vehicleGroups = ['BEHV', 'BEV', 'ICE'];

    const bl1 = vehicleGroups.map(vt => prop(nodeById(schema, `OEMCurrentDemand_${vt}`), 'percentageChangeBL1'));
    const bl2 = vehicleGroups.map(vt => prop(nodeById(schema, `OEMCurrentDemand_${vt}`), 'percentageChangeBL2'));

    return {
        key: 'oem',
        label: 'OEM Survey',
        subtitle: 'Vehicle Demand',
        description: 'OEM monthly survey — vehicle demand by powertrain type vs prior baselines',
        groups: vehicleGroups,
        bl1,
        bl2,
        regionalDemand: extractRegionalDemand(schema, 'OEM'),
        futureDemand: extractOemFutureDemand(schema),
        autonomousDriving: extractAutonomousDriving(schema),
        shortageData: extractShortageData(schema, 'OEM_Survey_Instance')
    };
}

function extractSemiconductorSurvey(schema) {
    const bl1 = SEMI_GROUPS.map(g => prop(nodeById(schema, SEMI_CURRENT_NODE_IDS[g]), 'percentageChangeBL1'));
    const bl2 = SEMI_GROUPS.map(g => prop(nodeById(schema, SEMI_CURRENT_NODE_IDS[g]), 'percentageChangeBL2'));

    return {
        key: 'semi',
        label: 'Semiconductor',
        subtitle: 'Technology Node Demand',
        description: 'Semiconductor supplier survey — demand by process node size vs prior baselines',
        groups: SEMI_GROUPS,
        bl1,
        bl2,
        regionalDemand: extractRegionalDemand(schema, 'Semiconductor'),
        futureDemand: extractSemiFutureDemand(schema),
        inventoryTrend: extractSemiInventoryTrends(schema),
        inventoryTarget: extractSemiInventoryTargets(schema),
        orderCancellation: extractSemiOrderCancellations(schema),
        shortageData: extractShortageData(schema, 'Semiconductor_Survey_Instance')
    };
}

function extractTier1Survey(schema) {
    const bl1Node = nodeById(schema, 'Tier1CurrentDemand_BL1');
    const bl2Node = nodeById(schema, 'Tier1CurrentDemand_BL2');

    return {
        key: 'tier1',
        label: 'Tier 1 Suppliers',
        subtitle: 'Component Demand',
        description: 'Tier 1 supplier survey — component demand and market segment analysis',
        groups: ['Automotive'],
        bl1: [prop(bl1Node, 'percentageChange')],
        bl2: [prop(bl2Node, 'percentageChange')],
        regionalDemand: extractRegionalDemand(schema, 'Tier1'),
        futureDemand: extractTier1FutureDemand(schema),
        componentSplit: extractComponentSplit(schema),
        inventoryTrends: extractTier1InventoryTrends(schema),
        componentActivity: extractComponentActivity(schema)
    };
}

// ─── Main entry point ─────────────────────────────────────────────────────────

export function extractDashboardData(schema) {
    if (!schema?.nodes?.length) return [];

    const hasSurveyData = schema.nodes.some(node => node.id === 'OEM_Survey' || node.id === 'Semiconductor_Survey' || node.id === 'Tier1_Survey');
    if (!hasSurveyData) return [];

    return [extractOemSurvey(schema), extractSemiconductorSurvey(schema), extractTier1Survey(schema)];
}
