import Graph from 'graphlib/lib/graph'
import layoutGraph from './lib/layout.js'

function createGraph(nodes, edges) {
    let g = new Graph();

    // Set an object for the graph label
    g.setGraph({});

    // Default to assigning a new object as a label for each new edge.
    g.setDefaultEdgeLabel(function() { return {}; });

    // Add nodes to the graph. The first argument is the node id. The second is
    // metadata about the node. In this case we're going to add labels to each of
    // our nodes.
    for (const n in nodes) {
        g.setNode(n, nodes[n]);
    }

    // Add edges to the graph.
    edges.forEach(e => {
        g.setEdge(e[0], e[1]);
    })

    layoutGraph(g);

    return g;
}

function createJsonGraph(nodes, edges) {
    let g = createGraph(nodes, edges);

    return {
        nodes: g.nodes().map(function(v) {
            return {
                id: v,
                ...g.node(v)
            };
        }),
        edges: g.edges().map(function(e) {
            return {
                from: e.v,
                to: e.w,
                ...g.edge(e)
            };
        })
    };
}

export default {
    json: createJsonGraph,
    graph: createGraph
};