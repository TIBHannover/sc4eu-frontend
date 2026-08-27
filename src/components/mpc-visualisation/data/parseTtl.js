// ttlParser.js
//
// Combined TTL parsing module:
//  - Shared triple-collection pass + role assignment
//  - Force-mode projection (full instance graph) — used by the D3 force
//    tree. Same exports/shape as before, so existing consumers don't need
//    to change.
//  - Schema-mode projection (deduplicated ontology graph) — used by
//    ReactFlow. Layout is external: pipe the output into your existing
//    elkjs-based layoutGraph() (see note near the bottom).

import { Parser } from 'n3';

// ── RDF/RDFS/OWL vocabulary ────────────────────────────────────────────
const RDF_TYPE = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type';
const RDF_PROPERTY = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property';
const RDFS_CLASS = 'http://www.w3.org/2000/01/rdf-schema#Class';
const RDFS_SUBCLASSOF = 'http://www.w3.org/2000/01/rdf-schema#subClassOf';
const RDFS_DOMAIN = 'http://www.w3.org/2000/01/rdf-schema#domain';
const RDFS_RANGE = 'http://www.w3.org/2000/01/rdf-schema#range';
const OWL_CLASS = 'http://www.w3.org/2002/07/owl#Class';
const OWL_OBJECT_PROPERTY = 'http://www.w3.org/2002/07/owl#ObjectProperty';
const OWL_DATATYPE_PROPERTY = 'http://www.w3.org/2002/07/owl#DatatypeProperty';
const OWL_ANNOTATION_PROPERTY = 'http://www.w3.org/2002/07/owl#AnnotationProperty';

// rdf:Property / owl:*Property individuals (e.g.
// `survey:analyzesTechnologyNode a rdf:Property ; rdfs:domain ... ;
// rdfs:range ...`) are meta-vocabulary bookkeeping, not domain data. Left
// unfiltered, these leaked into both graphs as junk nodes — a node
// literally named "analyzesTechnologyNode", stray edges to "string" via
// rdfs:range on datatype properties, etc. Filtered out below.
const META_PROPERTY_TYPES = new Set([RDF_PROPERTY, OWL_OBJECT_PROPERTY, OWL_DATATYPE_PROPERTY, OWL_ANNOTATION_PROPERTY]);

// Literal properties we want to preserve on nodes.
const PRESERVED_LITERAL_PROPERTIES = new Set([
    'percentageChangeBL1',
    'percentageChangeBL2',
    'percentageChange',
    'totalDemand',
    'totalDemandPercentageChange',
    'participantCount',
    'splitPercentage',
    'isActiveInCategory',
    'inventoryTrend',
    'targetIndicatorStatus',
    'baselineType',
    'regionName',
    'periodLabel',
    'forTimePeriod',
    'hasPercentage',
    'hasYear',
    'assignedVehicleType',
    'assignedTechnologyNode',
    'componentType'
]);

// extractLocalName and extractId were duplicate implementations — kept as
// one, with extractLocalName aliased for anything importing the old name.
function extractId(uri) {
    return uri.split(/[#/]/).pop() ?? uri;
}

function extractLabel(uri) {
    const localName = extractId(uri);
    const decoded = decodeURIComponent(localName);
    return decoded.replaceAll('_', ' ');
}

// ─────────────────────────────────────────────────────────────────────────
// Role assignment
//
// FIXED: previously any class with no subClassOf parent was tagged
// "abstract" — but most domain classes here (DemandForRegion,
// CurrentDemandAnalysis, TechnologyNode, InventoryTargetIndicator_Semi,
// ...) are only ever reached via rdf:type, never subClassOf, so they *all*
// got misclassified as roots alongside Survey. Now: only nodes in rootIds
// (default: "Survey") are "abstract"; classes inside the subClassOf
// hierarchy get a depth-based tier/class/sub role; classes reached only via
// rdf:type (never subject of subClassOf) get a flat "class" role instead of
// being mistaken for a root.
// ─────────────────────────────────────────────────────────────────────────
const DEFAULT_ROOT_IDS = ['Survey'];

function assignRoles(nodeMap, subclassParentsByChild, rootIds = DEFAULT_ROOT_IDS) {
    const configuredRootIds = new Set(rootIds.filter(id => nodeMap.get(id)?.isClass));

    // Fallback for data where none of rootIds is present: classes with no
    // subclass parent that DO have at least one subclass child (i.e. actually
    // part of the hierarchy, not just an rdf:type target with no parent).
    let rootClassIds = configuredRootIds;
    if (rootClassIds.size === 0) {
        const nodesWithChildren = new Set();
        subclassParentsByChild.forEach(parents => parents.forEach(p => nodesWithChildren.add(p)));
        rootClassIds = new Set(
            [...nodeMap.keys()].filter(id => nodeMap.get(id).isClass && !subclassParentsByChild.has(id) && nodesWithChildren.has(id))
        );
    }

    const depthMemo = new Map();
    function resolveDepth(nodeId, visiting = new Set()) {
        if (rootClassIds.has(nodeId)) return 0;
        if (depthMemo.has(nodeId)) return depthMemo.get(nodeId);
        if (visiting.has(nodeId)) return 99; // cycle guard
        visiting.add(nodeId);
        const parentIds = subclassParentsByChild.get(nodeId) ?? [];
        const depth = parentIds.length === 0 ? 99 : Math.min(...parentIds.map(p => resolveDepth(p, visiting))) + 1;
        visiting.delete(nodeId);
        depthMemo.set(nodeId, depth);
        return depth;
    }

    nodeMap.forEach((nodeData, nodeId) => {
        if (!nodeData.isClass) {
            nodeData.role = 'instance';
            return;
        }
        if (rootClassIds.has(nodeId)) {
            nodeData.role = 'abstract';
            return;
        }
        if (!subclassParentsByChild.has(nodeId)) {
            // Never subject of subClassOf — reached only via rdf:type. Not part
            // of the tiered subclass hierarchy, so give it a flat class role
            // rather than misclassifying it as a root.
            nodeData.role = 'class';
            return;
        }
        const depth = resolveDepth(nodeId);
        nodeData.role = 'sub';
        if (depth === 1) {
            nodeData.role = 'tier';
        } else if (depth === 2) {
            nodeData.role = 'class';
        }
    });
}

// ─────────────────────────────────────────────────────────────────────────
// STEP 1 — Shared triple-collection pass. Both parseTtlText (force mode,
// D3 tree) and parseTtlSchema (schema mode, ReactFlow) build on this.
// ─────────────────────────────────────────────────────────────────────────
function collectGraph(ttlText) {
    return new Promise((resolve, reject) => {
        const parser = new Parser();
        const nodeMap = new Map();
        const edgeList = [];
        const subclassParentsByChild = new Map();

        function touchNode(uri) {
            const nodeId = extractId(uri);
            if (!nodeMap.has(nodeId)) {
                nodeMap.set(nodeId, {
                    id: nodeId,
                    label: extractLabel(uri),
                    isClass: false,
                    isMeta: false,
                    role: 'instance',
                    types: new Set(),
                    properties: {}
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
                resolve({ nodeMap, edgeList, subclassParentsByChild });
                return;
            }

            // ── Literal triples — store on the subject node ──────────────────
            if (quad.object.termType === 'Literal') {
                if (quad.subject.termType === 'NamedNode') {
                    const subjectId = touchNode(quad.subject.value);
                    const subjectData = nodeMap.get(subjectId);
                    const predicateLocal = extractId(quad.predicate.value);
                    if (PRESERVED_LITERAL_PROPERTIES.has(predicateLocal)) {
                        const rawValue = quad.object.value;
                        const numericValue = Number(rawValue);
                        subjectData.properties[predicateLocal] = Number.isNaN(numericValue) ? rawValue : numericValue;
                    }
                }
                return;
            }

            if (quad.subject.termType === 'BlankNode' || quad.object.termType === 'BlankNode') {
                return;
            }

            const subjectId = touchNode(quad.subject.value);
            const subjectData = nodeMap.get(subjectId);
            const predicateUri = quad.predicate.value;
            const objectUri = quad.object.value;

            // rdfs:domain / rdfs:range are meta-vocabulary bookkeeping on
            // property declarations (e.g. `survey:forTechnologyNode rdfs:domain
            // survey:Inventory, survey:OrderCancellation ; rdfs:range ...`) —
            // not part of the domain graph.
            if (predicateUri === RDFS_DOMAIN || predicateUri === RDFS_RANGE) {
                return;
            }

            if (predicateUri === RDF_TYPE) {
                subjectData.types.add(objectUri);
                if (objectUri === RDFS_CLASS || objectUri === OWL_CLASS) {
                    subjectData.isClass = true;
                    return;
                }
                if (META_PROPERTY_TYPES.has(objectUri)) {
                    subjectData.isMeta = true;
                    return;
                }
                const objectId = touchNode(objectUri);
                if (objectId !== subjectId) {
                    edgeList.push({ s: subjectId, t: objectId, style: 'inst', label: 'a' });
                }
                return;
            }

            if (predicateUri === RDFS_SUBCLASSOF) {
                const objectId = touchNode(objectUri);
                subjectData.isClass = true;
                const existingParents = subclassParentsByChild.get(subjectId) ?? [];
                subclassParentsByChild.set(subjectId, [...existingParents, objectId]);
                if (objectId !== subjectId) {
                    edgeList.push({ s: subjectId, t: objectId, style: 'sub', label: 'subClassOf' });
                }
                return;
            }

            const objectId = touchNode(objectUri);
            const predicateLabel = extractId(quad.predicate.value);
            if (objectId !== subjectId) {
                edgeList.push({ s: subjectId, t: objectId, style: 'prop', label: predicateLabel });
            }
        });
    });
}

// ─────────────────────────────────────────────────────────────────────────
// STEP 2a — Force-mode projection: full instance graph for the D3 force
// tree. Same output shape as before, so existing consumers keep working —
// meta-property junk nodes are now filtered out (a bugfix, not a breaking
// change: those were never meaningful data nodes).
// ─────────────────────────────────────────────────────────────────────────
export async function parseTtlText(ttlText) {
    const { nodeMap, edgeList, subclassParentsByChild } = await collectGraph(ttlText);
    assignRoles(nodeMap, subclassParentsByChild);

    const nodes = [...nodeMap.values()]
        .filter(nodeData => !nodeData.isMeta)
        .map(nodeData => ({
            id: nodeData.id,
            label: nodeData.label,
            role: nodeData.role,
            ck: nodeData.id,
            active: false,
            tip: [...nodeData.types].map(extractLabel).join(', '),
            properties: nodeData.properties
        }));

    const edges = edgeList.map((edge, index) => ({ ...edge, id: `edge-${index}` }));

    return { nodes, edges };
}

export async function parseTtlFile(file) {
    let text;
    try {
        text = await file.text();
    } catch {
        throw new Error(`Failed to read file: ${file.name}`);
    }
    return parseTtlText(text);
}

export async function parseTtlUrl(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch TTL from ${url}: ${response.statusText}`);
    }
    return parseTtlText(await response.text());
}

// ─────────────────────────────────────────────────────────────────────────
// STEP 2b — Schema-mode projection: deduplicated ontology graph for
// ReactFlow.
//
// Design: rather than trying to keep every rdfs:Class (the ontology has ~50,
// most of which are leaf-level detail classes like InventoryDevelopment_Semi,
// 10nm_to_less_than_28nm, AutonomousDrivingDevelopment_OEM, etc.), we use an
// explicit allowlist of the ~15 conceptually meaningful schema classes and
// collapse everything else up to its nearest allowed ancestor.  This gives a
// compact, readable graph regardless of how many leaf classes the ontology
// grows to.
// ─────────────────────────────────────────────────────────────────────────

// The canonical schema nodes that survive into the ReactFlow view.
// Keys are ontology local-names; values are display overrides (label, role,
// ck).  Anything not in this set is collapsed to its nearest kept ancestor.
const SCHEMA_ALLOWLIST = new Map([
    // Root
    ['Survey', { label: 'Survey', role: 'abstract', ck: 'root' }],
    // Survey tiers
    ['OEM_Survey', { label: 'OEM Survey', role: 'tier', ck: 'oem' }],
    ['Semiconductor_Survey', { label: 'Semiconductor Survey', role: 'tier', ck: 'semi' }],
    ['Tier1_Survey', { label: 'Tier 1 Survey', role: 'tier', ck: 'tier1' }],
    // Demand branch
    ['Demand', { label: 'Demand', role: 'class', ck: 'demand' }],
    ['CurrentDemandAnalysis', { label: 'Current Demand', role: 'sub', ck: 'demand' }],
    ['FutureDemandAnalysis', { label: 'Future Demand', role: 'sub', ck: 'demand' }],
    ['DemandForRegion', { label: 'Demand For Region', role: 'sub', ck: 'demand' }],
    // Vehicle types (OEM + Tier1)
    ['VehicleType', { label: 'Vehicle Type', role: 'class', ck: 'vehicle' }],
    ['BEHV', { label: 'BEHV', role: 'sub', ck: 'vehicle', groupKey: 'BEHV' }],
    ['BEV', { label: 'BEV', role: 'sub', ck: 'vehicle', groupKey: 'BEV' }],
    ['ICE', { label: 'ICE', role: 'sub', ck: 'vehicle', groupKey: 'ICE' }],
    // Autonomous driving
    ['AutonomousDrivingDevelopment', { label: 'AD Development', role: 'class', ck: 'ad' }],
    // Time
    ['TimePeriod', { label: 'Time Period', role: 'class', ck: 'time' }],
    ['Quarter', { label: 'Quarter', role: 'sub', ck: 'time' }],
    // Inventory branch
    ['Inventory', { label: 'Inventory', role: 'class', ck: 'inventory' }],
    ['InventoryDevelopment', { label: 'Inventory Development', role: 'sub', ck: 'inventory' }],
    ['InventoryTargetIndicator', { label: 'Inventory Target', role: 'sub', ck: 'inventory' }],
    // Semiconductor-specific
    ['OrderCancellation', { label: 'Order Cancellation', role: 'class', ck: 'cancel' }],
    ['SemiconductorShortage', { label: 'Semi Shortage', role: 'class', ck: 'shortage' }],
    // Tech-node buckets (canonical ids created below)
    ['TechNode_lte_7nm', { label: '≤7nm', role: 'sub', ck: 'tech', groupKey: '≤7nm' }],
    ['TechNode_10_to_28nm', { label: '10–28nm', role: 'sub', ck: 'tech', groupKey: '10–28nm' }],
    ['TechNode_28_to_45nm', { label: '28–45nm', role: 'sub', ck: 'tech', groupKey: '28–45nm' }],
    ['TechNode_55_to_180nm', { label: '55–180nm', role: 'sub', ck: 'tech', groupKey: '55–180nm' }],
    ['TechNode_gte_180nm', { label: '≥180nm', role: 'sub', ck: 'tech', groupKey: '≥180nm' }],
    // Tier-1 specific
    ['ComponentShare', { label: 'Component Share', role: 'class', ck: 'component' }],
    // MarketSegment: clicking it selects "Automotive" which is the Tier1 survey group
    ['MarketSegment', { label: 'Market Segment', role: 'class', ck: 'demand', groupKey: 'Automotive' }],
    // Geography
    ['Region', { label: 'Region', role: 'class', ck: 'region' }]
]);

// Synthetic tech-node buckets. None of these raw shorthand tag URIs carry
// rdf:type anywhere in the ontology, so the clustering has to be declared
// explicitly rather than discovered structurally.
const TECH_NODE_BUCKETS = [
    {
        canonicalId: 'TechNode_lte_7nm',
        label: '≤7nm',
        aliases: [
            'lte_7nm',
            '7nm_or_less',
            'TechCategory_%3C%3D_7nm',
            'OrderCancellationChange_Semiconductor_lt%3D_7nm',
            'InventoryDevelopment_Semi_lte_7nm',
            'InventoryTargetIndicator_Semi_lte_7nm'
        ]
    },
    {
        canonicalId: 'TechNode_10_to_28nm',
        label: '10–28nm',
        aliases: ['10nm_to_less_than_28nm', '10nm_to_%3C28nm', 'TechCategory_10nm_to_%3C28nm', 'OrderCancellationChange_Semiconductor_10nm_to_lt28nm']
    },
    {
        canonicalId: 'TechNode_28_to_45nm',
        label: '28–45nm',
        aliases: ['28nm_to_less_than_45nm', '28nm_to_%3C45nm', 'TechCategory_28nm_to_%3C45nm', 'OrderCancellationChange_Semiconductor_28nm_to_lt45nm']
    },
    {
        canonicalId: 'TechNode_55_to_180nm',
        label: '55–180nm',
        aliases: ['55nm_to_180nm', 'TechCategory_55nm_to_180nm', 'OrderCancellationChange_Semiconductor_55nm_to_180nm']
    },
    {
        canonicalId: 'TechNode_gte_180nm',
        label: '≥180nm',
        aliases: ['180nm_or_greater', 'TechCategory_180nm_or_greater', 'OrderCancellationChange_Semiconductor_180nm_or_greater']
    }
];

const NODE_ALIASES = Object.fromEntries(TECH_NODE_BUCKETS.flatMap(bucket => bucket.aliases.map(aliasId => [aliasId, bucket.canonicalId])));

// Additional collapse rules: these leaf class IDs fold into a kept ancestor.
// Populated from the subclass hierarchy at parse time via collapseToAllowed().
// Static overrides for classes that won't be resolved structurally:
const STATIC_COLLAPSE = {
    // Semi nm-node sub-classes collapse to the canonical tech-node buckets
    // (handled by NODE_ALIASES above, listed here for documentation)

    // AD sub-classes collapse to AutonomousDrivingDevelopment
    AutonomousDrivingDevelopment_OEM: 'AutonomousDrivingDevelopment',
    AutonomousDrivingDevelopment_Tier1: 'AutonomousDrivingDevelopment',

    // Inventory sub-variants collapse to parent
    InventoryDevelopment_Semi: 'InventoryDevelopment',
    InventoryDevelopment_Tier1: 'InventoryDevelopment',
    InventoryTargetIndicator_Semi: 'InventoryTargetIndicator',
    OrderCancellationChange_Semi: 'OrderCancellation',

    // Demand sub-classes not in allowlist collapse to Demand
    AggregatedDemand: 'Demand',
    CurrentRegionalDemand: 'DemandForRegion',
    FutureRegionalDemand: 'DemandForRegion',
    DemandResponse: 'Demand',

    // ComponentShare leaf classes collapse to ComponentShare
    ComponentShare_Tier1: 'ComponentShare',
    ComponentType_Tier1: 'ComponentShare',
    'Advanced_driver-assistance_systems_ADAS': 'ComponentShare',
    Body_and_convenience: 'ComponentShare',
    Chassis_and_safety: 'ComponentShare',
    Infotainment_and_Telematics: 'ComponentShare',
    Other: 'ComponentShare',
    Powertrain: 'ComponentShare',
    EV: 'ComponentShare',
    non_EV: 'ComponentShare',

    // Market segment
    Automotive: 'MarketSegment',

    // SAE levels collapse to AutonomousDrivingDevelopment (via vehicle/AD)
    SAELevel: 'AutonomousDrivingDevelopment'
};

// Creates each bucket's canonical node up front so representativeOf() always
// has somewhere to resolve aliases, even for buckets with no rdfs:Class.
function ensureCanonicalNodes(nodeMap) {
    for (const bucket of TECH_NODE_BUCKETS) {
        if (!nodeMap.has(bucket.canonicalId)) {
            nodeMap.set(bucket.canonicalId, {
                id: bucket.canonicalId,
                label: bucket.label,
                isClass: true,
                isMeta: false,
                role: 'sub',
                types: new Set(),
                properties: {}
            });
        }
    }
    // Ensure Region exists (it's only present as instances in the full ontology)
    if (!nodeMap.has('Region')) {
        nodeMap.set('Region', {
            id: 'Region',
            label: 'Region',
            isClass: true,
            isMeta: false,
            role: 'class',
            types: new Set(),
            properties: {}
        });
    }
}

// Walk subClassOf parents until we reach a node in the allowlist, using
// STATIC_COLLAPSE as a shortcut and NODE_ALIASES for tech-node buckets.
function collapseToAllowed(nodeId, subclassParentsByChild, visited = new Set()) {
    if (SCHEMA_ALLOWLIST.has(nodeId)) return nodeId;
    if (NODE_ALIASES[nodeId]) return NODE_ALIASES[nodeId];
    if (STATIC_COLLAPSE[nodeId]) return STATIC_COLLAPSE[nodeId];
    if (visited.has(nodeId)) return null;
    visited.add(nodeId);
    for (const parentId of subclassParentsByChild.get(nodeId) ?? []) {
        const result = collapseToAllowed(parentId, subclassParentsByChild, visited);
        if (result) return result;
    }
    return null;
}

// Explicit allowlist-id sets for each tier drill-down view.
// Used instead of BFS-based attribution because several structural class
// nodes (nm-node buckets, ComponentShare) carry no hasSurveyOrigin triples
// and cannot be attributed to a survey by walking the ontology alone.
const TIER_NODE_IDS = {
    OEM_Survey: new Set([
        'Survey',
        'OEM_Survey',
        'Demand',
        'CurrentDemandAnalysis',
        'FutureDemandAnalysis',
        'DemandForRegion',
        'VehicleType',
        'BEHV',
        'BEV',
        'ICE',
        'AutonomousDrivingDevelopment',
        'TimePeriod',
        'Quarter',
        'Region',
        'SemiconductorShortage'
    ]),
    Semiconductor_Survey: new Set([
        'Survey',
        'Semiconductor_Survey',
        'Demand',
        'CurrentDemandAnalysis',
        'FutureDemandAnalysis',
        'TechNode_lte_7nm',
        'TechNode_10_to_28nm',
        'TechNode_28_to_45nm',
        'TechNode_55_to_180nm',
        'TechNode_gte_180nm',
        'Inventory',
        'InventoryDevelopment',
        'InventoryTargetIndicator',
        'OrderCancellation',
        'SemiconductorShortage',
        'Region'
    ]),
    Tier1_Survey: new Set([
        'Survey',
        'Tier1_Survey',
        'Demand',
        'CurrentDemandAnalysis',
        'FutureDemandAnalysis',
        'ComponentShare',
        'AutonomousDrivingDevelopment',
        'VehicleType',
        'BEHV',
        'BEV',
        'ICE',
        'MarketSegment',
        'Region'
    ])
};

export async function parseTtlSchema(ttlText) {
    const { nodeMap, edgeList, subclassParentsByChild } = await collectGraph(ttlText);
    ensureCanonicalNodes(nodeMap);

    // Apply allowlist overrides to nodes that exist in the map
    for (const [id, overrides] of SCHEMA_ALLOWLIST) {
        const existing = nodeMap.get(id);
        if (existing) {
            existing.isClass = true;
            existing.label = overrides.label;
            existing.role = overrides.role;
        }
    }

    // Resolve every node to its allowed representative.
    // Priority: alias bucket → static collapse → structural subclass walk →
    //           rdf:type fallback (for pure instance nodes with no subClassOf).
    function representativeOf(nodeId) {
        if (SCHEMA_ALLOWLIST.has(nodeId)) return nodeId;
        if (NODE_ALIASES[nodeId]) {
            const canonical = NODE_ALIASES[nodeId];
            return SCHEMA_ALLOWLIST.has(canonical) ? canonical : null;
        }
        if (STATIC_COLLAPSE[nodeId]) {
            const target = STATIC_COLLAPSE[nodeId];
            return SCHEMA_ALLOWLIST.has(target) ? target : null;
        }
        const walked = collapseToAllowed(nodeId, subclassParentsByChild);
        if (walked) return walked;
        // Fallback for pure instance nodes (a SomeClass, no rdfs:subClassOf):
        // try collapsing each of their rdf:type classes.
        const nd = nodeMap.get(nodeId);
        if (nd) {
            for (const typeUri of nd.types) {
                const result = collapseToAllowed(extractId(typeUri), subclassParentsByChild);
                if (result) return result;
            }
        }
        return null;
    }

    // ── Build the collapsed global edge set ──────────────────────────────────
    // rawSources tracks every raw node that maps to this collapsed edge so
    // tier attribution can check any of them (not just whichever happened first).
    const seenEdges = new Map();
    for (const edge of edgeList) {
        const s = representativeOf(edge.s);
        const t = representativeOf(edge.t);
        if (!s || !t || s === t) continue;
        const key = `${s}|${edge.label}|${t}|${edge.style}`;
        if (!seenEdges.has(key)) {
            seenEdges.set(key, { s, t, label: edge.label, style: edge.style, rawSources: new Set([edge.s]) });
        } else {
            seenEdges.get(key).rawSources.add(edge.s);
        }
    }
    const allEdges = [...seenEdges.values()].map((e, i) => ({
        id: `edge-${i}`,
        s: e.s,
        t: e.t,
        label: e.label,
        style: e.style,
        rawSources: [...e.rawSources] // array for easy iteration; stripped before return
    }));

    // ── Build node list ───────────────────────────────────────────────────────
    const referencedIds = new Set(allEdges.flatMap(e => [e.s, e.t]));
    referencedIds.add('Survey');

    function makeNode(id) {
        const nodeData = nodeMap.get(id);
        const overrides = SCHEMA_ALLOWLIST.get(id);
        // Only sub-role nodes with a groupKey are promoted to "sub_clickable" —
        // they become pills and get the distinct selectable palette.
        // Class-role nodes that happen to have a groupKey (e.g. MarketSegment →
        // "Automotive") keep their "class" role and shape; the groupKey alone
        // is enough to make them interactive without changing their visual tier.
        const role = overrides.groupKey && overrides.role === 'sub' ? 'sub_clickable' : overrides.role;
        return {
            id,
            label: overrides.label,
            role,
            ck: overrides.ck,
            groupKey: overrides.groupKey ?? null,
            tip: [...(nodeData?.types ?? [])].map(extractLabel).join(', '),
            properties: nodeData?.properties ?? {}
        };
    }

    // Overview shows only top-level structural nodes (abstract / tier / class).
    // Sub-nodes (nm buckets, vehicle types, component sub-classes, quarters, …)
    // are meaningful only in their specific tier drill-down, not in the overview.
    const OVERVIEW_ROLES = new Set(['abstract', 'tier', 'class']);

    const overviewNodeIds = new Set(
        [...SCHEMA_ALLOWLIST.entries()]
            .filter(([id, meta]) => OVERVIEW_ROLES.has(meta.role) && referencedIds.has(id) && nodeMap.has(id))
            .map(([id]) => id)
    );
    overviewNodeIds.add('Survey');

    const allNodes = [...overviewNodeIds].map(makeNode);

    // ── Build per-tier schemas ────────────────────────────────────────────────
    // Filter allEdges to those where both endpoints are in the tier's explicit
    // node-id set, then prune noisy edges that make the graph unreadable, then
    // for Semiconductor inject synthetic flat edges from the survey node to each
    // nm-node bucket (the ontology has no direct link).

    // Edge labels suppressed in ALL tier schemas:
    //  - hasSurveyOrigin: in a tier drill-down the survey origin is already
    //    implied; these edges add reverse arrows from every leaf back to the
    //    survey node, cluttering the layout.
    //  - hasSAELevel: connects BEHV/BEV/ICE → AutonomousDrivingDevelopment,
    //    creating a bidirectional cycle with the hasVehicleType edges that go
    //    the other way. One direction (hasVehicleType) is enough.
    //  - analyzesVehicleType: a data anomaly in the ontology causes every
    //    FutureDemand entry to point to ICE regardless of vehicle type,
    //    producing a spurious FutureDemand → ICE edge.
    const SUPPRESSED_GLOBALLY = new Set(['hasSurveyOrigin', 'hasSAELevel', 'analyzesVehicleType']);

    // Edge labels suppressed only in the Semiconductor tier:
    //  - analyzesTechnologyNode: CurrentDemand/FutureDemand each fan out to all
    //    5 nm-nodes (10 edges). The synthetic hasTechnologyNode edges from the
    //    survey already show the nm-node grouping; these add redundant crosses.
    //  - forTechnologyNode: OrderCancellation → each nm-node (5 edges), also
    //    already implied by the synthetic survey→nm edges.
    //  - subClassOf edges from nm-nodes to Inventory/InventoryDevelopment/
    //    InventoryTargetIndicator/OrderCancellation (15 edges, 3 per bucket):
    //    suppressed by dropping all sub-style edges whose source is a tech-node,
    //    keeping the structure readable via the synthetic survey→nm-node edges.
    const SUPPRESSED_SEMI_LABELS = new Set(['analyzesTechnologyNode', 'forTechnologyNode']);
    const NM_NODE_IDS = new Set(['TechNode_lte_7nm', 'TechNode_10_to_28nm', 'TechNode_28_to_45nm', 'TechNode_55_to_180nm', 'TechNode_gte_180nm']);

    const SURVEY_IDS = new Set(['OEM_Survey', 'Semiconductor_Survey', 'Tier1_Survey']);
    const tierSchemas = {};

    for (const surveyId of SURVEY_IDS) {
        const allowedIds = TIER_NODE_IDS[surveyId];
        const isSemi = surveyId === 'Semiconductor_Survey';

        let tierEdges = allEdges
            .filter(e => {
                if (!allowedIds.has(e.s) || !allowedIds.has(e.t)) return false;
                if (SUPPRESSED_GLOBALLY.has(e.label)) return false;
                if (isSemi && SUPPRESSED_SEMI_LABELS.has(e.label)) return false;
                // Drop subClassOf edges from nm-node buckets — the synthetic
                // hasTechnologyNode edges already position them under the survey.
                if (isSemi && e.style === 'sub' && NM_NODE_IDS.has(e.s)) return false;
                return true;
            })
            .map(({ rawSources: _rs, ...rest }) => rest); // strip internal field

        // Semiconductor: inject five synthetic prop edges so nm-nodes connect
        // directly to the survey node (flat layout as requested).
        if (isSemi) {
            NM_NODE_IDS.forEach(nmId => {
                tierEdges.push({ s: 'Semiconductor_Survey', t: nmId, label: 'hasTechnologyNode', style: 'prop' });
            });
        }

        // Re-assign stable ids after any additions
        tierEdges = tierEdges.map((e, i) => ({ ...e, id: `edge-${i}` }));

        const tierNodeIds = new Set(tierEdges.flatMap(e => [e.s, e.t]));
        tierNodeIds.add('Survey');
        tierNodeIds.add(surveyId);

        const tierNodes = [...SCHEMA_ALLOWLIST.keys()].filter(id => tierNodeIds.has(id) && nodeMap.has(id)).map(makeNode);

        tierSchemas[surveyId] = {
            nodes: tierNodes.map(n => (n.id === surveyId ? { ...n, active: true } : n)),
            edges: tierEdges
        };
    }

    // Tag tier nodes in the overview with their tierKey
    // Map ontology survey IDs to the short keys used by activeTier / TIER_SCHEMA.
    // These must match DOMAIN_ID_TO_SURVEY_KEY in surveys.js.
    const ONTOLOGY_ID_TO_SURVEY_KEY = {
        OEM_Survey: 'oem',
        Semiconductor_Survey: 'semi',
        Tier1_Survey: 'tier1'
    };

    const overviewNodes = allNodes.map(n => (SURVEY_IDS.has(n.id) ? { ...n, tierKey: ONTOLOGY_ID_TO_SURVEY_KEY[n.id] ?? n.id } : n));

    // Build overview edges:
    //  1. subClassOf edges between overview-level nodes (e.g. tier → Survey)
    //  2. Synthetic "covers" edges from each survey tier to every class-role node
    //     that appears in its tier schema — this connects Demand, VehicleType,
    //     Inventory etc. to their survey in the overview without relying on
    //     hasSurveyOrigin (suppressed) or sub-node intermediaries (excluded).
    const subEdges = allEdges
        .filter(e => overviewNodeIds.has(e.s) && overviewNodeIds.has(e.t) && e.style === 'sub')
        .map(({ rawSources: _rs, ...rest }) => rest);

    const seenOverviewEdges = new Set(subEdges.map(e => `${e.s}|${e.t}`));
    const syntheticEdges = [];

    for (const surveyId of SURVEY_IDS) {
        // Use TIER_NODE_IDS as the source of truth — not tierSchema.nodes, which
        // only contains nodes that survived edge filtering (e.g. SemiconductorShortage
        // has no non-suppressed edges so it never appears in the tier schema node list
        // even though it conceptually belongs to that survey).
        TIER_NODE_IDS[surveyId].forEach(nodeId => {
            if (nodeId === surveyId || nodeId === 'Survey') return; // skip self and root
            if (!overviewNodeIds.has(nodeId)) return; // only class-role nodes in overview
            const key = `${surveyId}|${nodeId}`;
            if (seenOverviewEdges.has(key)) return;
            seenOverviewEdges.add(key);
            syntheticEdges.push({ s: surveyId, t: nodeId, label: 'covers', style: 'prop' });
        });
    }

    const cleanEdges = [...subEdges, ...syntheticEdges].map((e, i) => ({ ...e, id: `edge-${i}` }));

    return {
        nodes: overviewNodes,
        edges: cleanEdges,
        tierSchemas
    };
}

// ─────────────────────────────────────────────────────────────────────────
// Domain extraction — used by the D3 force tree to group/filter nodes by
// survey origin (OEM / Semiconductor / Tier 1).
// ─────────────────────────────────────────────────────────────────────────

const SURVEY_DOMAIN_DEFINITIONS = [
    { id: 'OEM_Survey', label: 'OEM Survey', originIds: new Set(['OEM_Survey', 'OEM_Survey_Instance']) },
    { id: 'Semiconductor_Survey', label: 'Semiconductor', originIds: new Set(['Semiconductor_Survey', 'Semiconductor_Survey_Instance']) },
    { id: 'Tier1_Survey', label: 'Tier 1 Suppliers', originIds: new Set(['Tier1_Survey', 'Tier1_Survey_Instance']) }
];

export function extractSurveyDomains(schema) {
    if (!schema) return [];

    // Build directed adjacency: subclass children, instance classes, and
    // outgoing prop targets.  We deliberately do NOT walk reverse-prop edges
    // (propSourcesByTarget) — doing so caused every domain to collect the same
    // giant set because shared structural nodes (Demand, Inventory, …) are
    // targets of prop-edges from all three survey classes.
    const childrenByParentId = new Map();
    const classByInstanceId = new Map();
    const propTargetsBySource = new Map();

    schema.edges.forEach(e => {
        if (e.style === 'sub') {
            const children = childrenByParentId.get(e.t) ?? [];
            children.push(e.s);
            childrenByParentId.set(e.t, children);
        } else if (e.style === 'inst') {
            const classes = classByInstanceId.get(e.s) ?? [];
            classes.push(e.t);
            classByInstanceId.set(e.s, classes);
        } else if (e.style === 'prop') {
            const targets = propTargetsBySource.get(e.s) ?? [];
            targets.push(e.t);
            propTargetsBySource.set(e.s, targets);
        }
    });

    const instanceIds = new Set(schema.nodes.filter(n => n.role === 'instance').map(n => n.id));

    // Directed BFS: from seed, follow subclass children and outgoing prop edges.
    // This keeps each domain's membership to nodes actually associated with
    // that specific survey, rather than everything reachable in the graph.
    function collectReachable(seedIds) {
        const reachable = new Set(seedIds);
        const queue = [...seedIds];
        while (queue.length > 0) {
            const currentId = queue.shift();
            [
                ...(childrenByParentId.get(currentId) ?? []),
                ...(classByInstanceId.get(currentId) ?? []),
                ...(propTargetsBySource.get(currentId) ?? [])
            ].forEach(nextId => {
                if (!reachable.has(nextId)) {
                    reachable.add(nextId);
                    queue.push(nextId);
                }
            });
        }
        return reachable;
    }

    return SURVEY_DOMAIN_DEFINITIONS.map(def => {
        const seedIds = new Set();
        // Seed from any node that carries hasSurveyOrigin pointing to this survey
        schema.edges.forEach(e => {
            if (e.label === 'hasSurveyOrigin' && def.originIds.has(e.t)) seedIds.add(e.s);
        });
        // Also seed from the survey class node itself if present
        def.originIds.forEach(originId => {
            if (schema.nodes.some(n => n.id === originId)) seedIds.add(originId);
        });
        if (seedIds.size === 0) return null;

        const memberNodeIds = collectReachable(seedIds);

        // Count only nodes that the force tree will actually render as structural
        // (visible without expansion). These are member nodes that exist in the
        // schema, are not "instance" role, and would pass the isDataInstanceNode
        // filter used by buildFilteredSchema. Using role !== "instance" from the
        // parsed schema is the canonical equivalent.
        const structuralMemberCount = [...memberNodeIds].filter(id => {
            if (instanceIds.has(id)) return false;
            const node = schema.nodes.some(n => n.id === id);
            return Boolean(node); // must exist in schema (not just referenced in edges)
        }).length;

        return {
            id: def.id,
            label: def.label,
            memberNodeIds,
            memberCount: structuralMemberCount,
            totalMemberCount: memberNodeIds.size
        };
    }).filter(Boolean);
}

export function filterSchemaByDomain(schema, domainMemberNodeIds) {
    const filteredNodes = schema.nodes.filter(n => domainMemberNodeIds.has(n.id));
    const filteredNodeIds = new Set(filteredNodes.map(n => n.id));
    const filteredEdges = schema.edges.filter(e => filteredNodeIds.has(e.s) && filteredNodeIds.has(e.t));
    return { nodes: filteredNodes, edges: filteredEdges };
}
