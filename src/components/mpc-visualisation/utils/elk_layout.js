import ELK from 'elkjs/lib/elk.bundled.js';

const elk = new ELK();

const elkOptions = {
    'elk.algorithm': 'layered',
    'elk.direction': 'DOWN',
    'elk.layered.nodePlacement.strategy': 'NETWORK_SIMPLEX',
    'elk.spacing.nodeNode': '100',
    'elk.layered.spacing.nodeNodeBetweenLayers': '150',
    'elk.nodeLabels.placement': 'INSIDE V_CENTER H_CENTER',
    'elk.edgeRouting': 'SPLINES'
};

export async function layoutGraph(nodes, edges) {
    const elkGraph = {
        id: 'root',
        layoutOptions: elkOptions,
        children: nodes.map(n => ({
            id: n.id,
            width: n.width || 150,
            height: n.height || 60
        })),
        edges: edges.map(e => ({
            id: e.id,
            sources: [e.source],
            targets: [e.target]
        }))
    };

    try {
        const layoutedGraph = await elk.layout(elkGraph);
        return nodes.map(node => {
            const elkNode = layoutedGraph.children.find(n => n.id === node.id);
            return {
                ...node,
                position: { x: elkNode.x, y: elkNode.y }
            };
        });
    } catch (err) {
        console.error('ELK Layout Error:', err);
        return nodes;
    }
}
