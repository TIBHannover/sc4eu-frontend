import { Parser } from "n3";

const RDF_TYPE        = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type";
const RDFS_CLASS      = "http://www.w3.org/2000/01/rdf-schema#Class";
const RDFS_SUBCLASSOF = "http://www.w3.org/2000/01/rdf-schema#subClassOf";
const OWL_CLASS       = "http://www.w3.org/2002/07/owl#Class";
const SURVEY_PREFIX   = "http://www.semanticweb.org/gibajajulena/ontologies/2025/9/OEM_Monthly_Survey/";

// Literal properties we want to preserve on nodes.
// Key: local property name → property name stored on node.properties.
const PRESERVED_LITERAL_PROPERTIES = new Set([
  "percentageChangeBL1",
  "percentageChangeBL2",
  "percentageChange",
  "totalDemand",
  "totalDemandPercentageChange",
  "participantCount",
  "splitPercentage",
  "isActiveInCategory",
  "inventoryTrend",
  "targetIndicatorStatus",
  "baselineType",
  "regionName",
  "periodLabel",
  "hasPercentage",
  "hasYear",
  "assignedVehicleType",
  "assignedTechnologyNode",
  "componentType",
]);

function extractLocalName(uri) {
  return uri.split(/[#/]/).pop() ?? uri;
}

function extractLabel(uri) {
  const localName = uri.split(/[#/]/).pop() ?? uri;
  const decoded   = decodeURIComponent(localName);
  return decoded.replace(/_/g, " ");
}

function extractId(uri) {
  return uri.split(/[#/]/).pop() ?? uri;
}

function resolveEdgeStyle(predicateUri) {
  if (predicateUri === RDFS_SUBCLASSOF) return "sub";
  if (predicateUri === RDF_TYPE)        return "inst";
  return "prop";
}

function assignRoles(nodeMap, subclassParentsByChild) {
  const rootClassIds = new Set(
    [...nodeMap.keys()].filter(
      (nodeId) =>
        nodeMap.get(nodeId).isClass &&
        !subclassParentsByChild.has(nodeId)
    )
  );

  function resolveDepth(nodeId, visitedIds = new Set()) {
    if (visitedIds.has(nodeId)) return 99;
    if (rootClassIds.has(nodeId)) return 0;
    visitedIds.add(nodeId);

    const parentIds     = subclassParentsByChild.get(nodeId) ?? [];
    if (parentIds.length === 0) return 99;

    const minParentDepth = Math.min(
      ...parentIds.map((parentId) => resolveDepth(parentId, new Set(visitedIds)))
    );
    return minParentDepth + 1;
  }

  nodeMap.forEach((nodeData, nodeId) => {
    if (!nodeData.isClass) { nodeData.role = "instance"; return; }
    if (rootClassIds.has(nodeId)) { nodeData.role = "abstract"; return; }

    const depth = resolveDepth(nodeId);
    nodeData.role = depth === 1 ? "tier" : depth === 2 ? "class" : "sub";
  });
}

export function parseTtlText(ttlText) {
  return new Promise((resolve, reject) => {
    const parser                 = new Parser();
    const nodeMap                = new Map();
    const edgeList               = [];
    const subclassParentsByChild = new Map();

    function touchNode(uri) {
      const nodeId = extractId(uri);
      if (!nodeMap.has(nodeId)) {
        nodeMap.set(nodeId, {
          id:         nodeId,
          label:      extractLabel(uri),
          isClass:    false,
          role:       "instance",
          types:      new Set(),
          properties: {},   // ← stores literal values keyed by local property name
        });
      }
      return nodeId;
    }

    parser.parse(ttlText, (parseError, quad) => {
      if (parseError) {
        reject(new Error(`TTL parse error: ${parseError.message}`));
        return;
      }

      if (!quad) {
        assignRoles(nodeMap, subclassParentsByChild);

        const nodes = [...nodeMap.values()].map((nodeData) => ({
          id:         nodeData.id,
          label:      nodeData.label,
          role:       nodeData.role,
          ck:         nodeData.id,
          active:     false,
          tip:        [...nodeData.types].map(extractLabel).join(", "),
          // Expose collected literal properties for dashboard extraction.
          properties: nodeData.properties,
        }));

        const edges = edgeList.map((edge, index) => ({
          ...edge,
          id: `edge-${index}`,
        }));

        resolve({ nodes, edges });
        return;
      }

      // ── Literal triples — store on the subject node ──────────────────────
      if (quad.object.termType === "Literal") {
        if (quad.subject.termType === "NamedNode") {
          const subjectId       = touchNode(quad.subject.value);
          const subjectData     = nodeMap.get(subjectId);
          const predicateLocal  = extractLocalName(quad.predicate.value);

          // Only store properties the dashboard needs.
          if (PRESERVED_LITERAL_PROPERTIES.has(predicateLocal)) {
            const rawValue = quad.object.value;

            // Parse numeric values — store as number, others as string.
            const numericValue = Number(rawValue);
            subjectData.properties[predicateLocal] = isNaN(numericValue)
              ? rawValue
              : numericValue;
          }
        }
        return;
      }

      if (
        quad.subject.termType === "BlankNode" ||
        quad.object.termType  === "BlankNode"
      ) {
        return;
      }

      const subjectId    = touchNode(quad.subject.value);
      const subjectData  = nodeMap.get(subjectId);
      const predicateUri = quad.predicate.value;
      const objectUri    = quad.object.value;

      if (predicateUri === RDF_TYPE) {
        subjectData.types.add(objectUri);
        if (objectUri === RDFS_CLASS || objectUri === OWL_CLASS) {
          subjectData.isClass = true;
          return;
        }
        const objectId = touchNode(objectUri);
        if (objectId !== subjectId) {
          edgeList.push({ s: subjectId, t: objectId, style: "inst", label: "a" });
        }
        return;
      }

      if (predicateUri === RDFS_SUBCLASSOF) {
        const objectId = touchNode(objectUri);
        subjectData.isClass = true;

        const existingParents = subclassParentsByChild.get(subjectId) ?? [];
        subclassParentsByChild.set(subjectId, [...existingParents, objectId]);

        if (objectId !== subjectId) {
          edgeList.push({ s: subjectId, t: objectId, style: "sub", label: "subClassOf" });
        }
        return;
      }

      const objectId       = touchNode(objectUri);
      const predicateLabel = extractLocalName(quad.predicate.value);

      if (objectId !== subjectId) {
        edgeList.push({ s: subjectId, t: objectId, style: "prop", label: predicateLabel });
      }
    });
  });
}

export function parseTtlFile(file) {
  return new Promise((resolve, reject) => {
    const reader    = new FileReader();
    reader.onload   = (loadEvent) => parseTtlText(loadEvent.target.result).then(resolve).catch(reject);
    reader.onerror  = () => reject(new Error(`Failed to read file: ${file.name}`));
    reader.readAsText(file);
  });
}

export async function parseTtlUrl(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch TTL from ${url}: ${response.statusText}`);
  }
  return parseTtlText(await response.text());
}

// ── Domain extraction (unchanged from previous version) ──────────────────────

const SURVEY_DOMAIN_DEFINITIONS = [
  { id: "OEM_Survey",            label: "OEM Survey",       originIds: new Set(["OEM_Survey", "OEM_Survey_Instance"])             },
  { id: "Semiconductor_Survey",  label: "Semiconductor",    originIds: new Set(["Semiconductor_Survey", "Semiconductor_Survey_Instance"]) },
  { id: "Tier1_Survey",          label: "Tier 1 Suppliers", originIds: new Set(["Tier1_Survey", "Tier1_Survey_Instance"])          },
];

const INSTANCE_PREFIXES = [
  "assumption_", "tech_assumption_", "FutureDemand_", "CurrentDemand_",
  "AutonomousDrivingDevelopment_OEM_", "AutonomousDrivingDevelopment_Tier1_",
  "InventoryTrend_Aggregated_", "InventoryTarget_Aggregated_",
  "OrderCancellation_Aggregated_", "SemiconductorShortage_Aggregated_",
  "OEMCurrentDemand_", "OEMFutureDemand_", "SemiCurrentDemand_",
  "SemiFutureDemand_", "Tier1CurrentDemand_", "Tier1FutureDemand_",
  "FutureRegionalDemand_", "CurrentRegionalDemand_", "ConvFactor_", "AggregatedTrend_",
];

function isInstanceId(nodeId) {
  return INSTANCE_PREFIXES.some((prefix) => nodeId.includes(prefix));
}

export function extractSurveyDomains(schema) {
  if (!schema) return [];

  const subclassEdges      = schema.edges.filter((e) => e.style === "sub");
  const parentsByChildId   = new Map();
  const childrenByParentId = new Map();

  subclassEdges.forEach((e) => {
    const parents  = parentsByChildId.get(e.s)   ?? []; parents.push(e.t);  parentsByChildId.set(e.s, parents);
    const children = childrenByParentId.get(e.t) ?? []; children.push(e.s); childrenByParentId.set(e.t, children);
  });

  const classByInstanceId = new Map();
  schema.edges
    .filter((e) => e.style === "inst")
    .forEach((e) => {
      const classes = classByInstanceId.get(e.s) ?? []; classes.push(e.t);
      classByInstanceId.set(e.s, classes);
    });

  function collectReachable(seedIds) {
    const reachable = new Set(seedIds);
    const queue     = [...seedIds];
    while (queue.length > 0) {
      const currentId = queue.shift();
      [...(parentsByChildId.get(currentId)   ?? []),
       ...(childrenByParentId.get(currentId) ?? []),
       ...(classByInstanceId.get(currentId)  ?? []),
      ].forEach((nextId) => {
        if (!reachable.has(nextId)) { reachable.add(nextId); queue.push(nextId); }
      });
    }
    return reachable;
  }

  return SURVEY_DOMAIN_DEFINITIONS
    .map((def) => {
      const seedIds = new Set();
      schema.edges.forEach((e) => {
        if (e.label === "hasSurveyOrigin" && def.originIds.has(e.t)) seedIds.add(e.s);
      });
      def.originIds.forEach((originId) => {
        if (schema.nodes.some((n) => n.id === originId)) seedIds.add(originId);
      });
      if (seedIds.size === 0) return null;

      const memberNodeIds         = collectReachable(seedIds);
      const structuralMemberCount = [...memberNodeIds].filter((id) => !isInstanceId(id)).length;

      return { id: def.id, label: def.label, memberNodeIds, memberCount: structuralMemberCount, totalMemberCount: memberNodeIds.size };
    })
    .filter(Boolean);
}

export function filterSchemaByDomain(schema, domainMemberNodeIds) {
  const filteredNodes   = schema.nodes.filter((n) => domainMemberNodeIds.has(n.id));
  const filteredNodeIds = new Set(filteredNodes.map((n) => n.id));
  const filteredEdges   = schema.edges.filter((e) => filteredNodeIds.has(e.s) && filteredNodeIds.has(e.t));
  return { nodes: filteredNodes, edges: filteredEdges };
}