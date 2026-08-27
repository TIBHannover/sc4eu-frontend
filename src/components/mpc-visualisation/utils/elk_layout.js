import ELK from 'elkjs/lib/elk.bundled.js';

const elk = new ELK();

// Base options shared by all layouts
const BASE_OPTIONS = {
    'elk.algorithm': 'layered',
    'elk.direction': 'DOWN',
    'elk.layered.nodePlacement.strategy': 'NETWORK_SIMPLEX',
    'elk.layered.crossingMinimization.strategy': 'LAYER_SWEEP',
    'elk.nodeLabels.placement': 'INSIDE V_CENTER H_CENTER',
    'elk.edgeRouting': 'ORTHOGONAL',
};

// Tighter spacing for the compact overview (few nodes, wide labels)
const OVERVIEW_OPTIONS = {
    ...BASE_OPTIONS,
    'elk.spacing.nodeNode': '80',
    'elk.layered.spacing.nodeNodeBetweenLayers': '120',
};

// More breathing room for tier schemas which have denser edge sets
const TIER_OPTIONS = {
    ...BASE_OPTIONS,
    'elk.spacing.nodeNode': '60',
    'elk.layered.spacing.nodeNodeBetweenLayers': '100',
};

export async function layoutGraph(nodes, edges, isTier = false) {
    const layoutOptions = isTier ? TIER_OPTIONS : OVERVIEW_OPTIONS;

    // buildGraphEdges already swaps source/target for subClassOf edges so that
    // ReactFlow draws parent-bottom → child-top.  The edges arriving here
    // therefore already flow top-down (source=parent, target=child) for
    // subClassOf, and also top-down for prop edges.  Feed them to ELK as-is —
    // no extra reversal needed.
    const elkEdges = edges.map((e, i) => ({
        id: `elk-edge-${i}`,
        sources: [e.source],
        targets: [e.target],
    }));

    const elkGraph = {
        id: 'root',
        layoutOptions,
        children: nodes.map(n => ({
            id: n.id,
            width: n.width || 150,
            height: n.height || 60,
        })),
        edges: elkEdges,
    };

    try {
        const layoutedGraph = await elk.layout(elkGraph);
        return nodes.map(node => {
            const elkNode = layoutedGraph.children.find(n => n.id === node.id);
            return {
                ...node,
                position: { x: elkNode.x, y: elkNode.y },
            };
        });
    } catch (err) {
        console.error('ELK Layout Error:', err);
        return nodes;
    }
}
