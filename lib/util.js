import _ from './lodash.js'
import Graph from './graphlib/graph.js'

/*
 * Adds a dummy node to the graph and return v.
 */
function addDummyNode(g, type, attrs, name) {
    var v;
    do {
        v = _.uniqueId(name);
    } while (g.hasNode(v));

    attrs.dummy = type;
    g.setNode(v, attrs);
    return v;
}

/*
 * Returns a new graph with only simple edges. Handles aggregation of data
 * associated with multi-edges.
 */
function simplify(g) {
    var simplified = new Graph().setGraph(g.graph());
    _.forEach(g.nodes(), v => simplified.setNode(v, g.node(v)));
    _.forEach(g.edges(), e => {
        var simpleLabel = simplified.edge(e.v, e.w) || { weight: 0, minlen: 1 };
        var label = g.edge(e);
        simplified.setEdge(e.v, e.w, {
            weight: simpleLabel.weight + label.weight,
            minlen: Math.max(simpleLabel.minlen, label.minlen)
        });
    });
    return simplified;
}

function asNonCompoundGraph(g) {
    var simplified = new Graph({ multigraph: g.isMultigraph() }).setGraph(g.graph());
    _.forEach(g.nodes(), v => {
        if (!g.children(v).length) {
            simplified.setNode(v, g.node(v));
        }
    });
    _.forEach(g.edges(), e => {
        simplified.setEdge(e, g.edge(e));
    });
    return simplified;
}

/*
 * Finds where a line starting at point ({x, y}) would intersect a rectangle
 * ({x, y, width, height}) if it were pointing at the rectangle's center.
 */
function intersectRect(rect, point) {
    var x = rect.x;
    var y = rect.y;

    // Rectangle intersection algorithm from:
    // http://math.stackexchange.com/questions/108113/find-edge-between-two-boxes
    var dx = point.x - x;
    var dy = point.y - y;
    var w = rect.width / 2;
    var h = rect.height / 2;

    if (!dx && !dy) {
        throw new Error("Not possible to find intersection inside of the rectangle");
    }

    var sx, sy;
    if (Math.abs(dy) * w > Math.abs(dx) * h) {
        // Intersection is top or bottom of rect.
        if (dy < 0) {
            h = -h;
        }
        sx = h * dx / dy;
        sy = h;
    } else {
        // Intersection is left or right of rect.
        if (dx < 0) {
            w = -w;
        }
        sx = w;
        sy = w * dy / dx;
    }

    return { x: x + sx, y: y + sy };
}

/*
 * Given a DAG with each node assigned "rank" and "order" properties, this
 * function will produce a matrix with the ids of each node.
 */
function buildLayerMatrix(g) {
    var layering = _.map(_.range(maxRank(g) + 1), () => []);
    _.forEach(g.nodes(), v => {
        var node = g.node(v);
        var rank = node.rank;
        if (!_.isUndefined(rank)) {
            layering[rank][node.order] = v;
        }
    });
    return layering;
}

/*
 * Adjusts the ranks for all nodes in the graph such that all nodes v have
 * rank(v) >= 0 and at least one node w has rank(w) = 0.
 */
function normalizeRanks(g) {
    var min = _.min(_.map(g.nodes(), v => g.node(v).rank));
    _.forEach(g.nodes(), v => {
        var node = g.node(v);
        if (_.has(node, "rank")) {
            node.rank -= min;
        }
    });
}

function removeEmptyRanks(g) {
    // Ranks may not start at 0, so we need to offset them
    var offset = _.min(_.map(g.nodes(), v => g.node(v).rank));

    var layers = [];
    _.forEach(g.nodes(), v => {
        var rank = g.node(v).rank - offset;
        if (!layers[rank]) {
            layers[rank] = [];
        }
        layers[rank].push(v);
    });

    var delta = 0;
    var nodeRankFactor = g.graph().nodeRankFactor;
    _.forEach(layers, (vs, i) => {
        if (_.isUndefined(vs) && i % nodeRankFactor !== 0) {
            --delta;
        } else if (delta) {
            _.forEach(vs, v => g.node(v).rank += delta);
        }
    });
}

function addBorderNode(g, prefix, rank, order) {
    var node = {
        width: 0,
        height: 0
    };
    if (arguments.length >= 4) {
        node.rank = rank;
        node.order = order;
    }
    return addDummyNode(g, "border", node, prefix);
}

function maxRank(g) {
    return _.max(_.map(g.nodes(), v => {
        var rank = g.node(v).rank;
        if (!_.isUndefined(rank)) {
            return rank;
        }
    }));
}

/*
 * Partition a collection into two groups: `lhs` and `rhs`. If the supplied
 * function returns true for an entry it goes into `lhs`. Otherwise it goes
 * into `rhs.
 */
function partition(collection, fn) {
    var result = { lhs: [], rhs: [] };
    _.forEach(collection, value => {
        if (fn(value)) {
            result.lhs.push(value);
        } else {
            result.rhs.push(value);
        }
    });
    return result;
}

export {
    addDummyNode,
    simplify,
    asNonCompoundGraph,
    intersectRect,
    buildLayerMatrix,
    normalizeRanks,
    removeEmptyRanks,
    addBorderNode,
    maxRank,
    partition
};