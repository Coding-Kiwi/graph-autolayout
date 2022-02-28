import Graph from './lib/graphlib/graph.js'
import layoutGraph from './lib/layout.js'

function createGraph(nodes, edges, options = {}) {
    let g = new Graph({
        multigraph: true,
        compound: true
    });

    // Set an object for the graph label
    g.setGraph(options);

    // Default to assigning a new object as a label for each new edge.
    g.setDefaultEdgeLabel(() => ({}));

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

function createJsonGraph(nodes, edges, options = {}) {
    let g = createGraph(nodes, edges, options);

    let ret = {};

    ret.nodes = g.nodes().map((v) => {
        return {
            id: v,
            ...g.node(v)
        };
    });

    ret.edges = g.edges().map((e) => {
        return {
            from: ret.nodes.find(n => n.id === e.v),
            to: ret.nodes.find(n => n.id === e.w),
            ...g.edge(e)
        };
    });

    ret.graph = g;
    ret.width = g.graph().width;
    ret.height = g.graph().height;

    return ret;
}

export default {
    json: createJsonGraph,
    graph: createGraph
};