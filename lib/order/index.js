import _ from '../lodash.js'
import Graph from '../graphlib/graph.js'

import initOrder from "./init-order.js"
import crossCount from "./cross-count.js"
import sortSubgraph from "./sort-subgraph.js"
import buildLayerGraph from "./build-layer-graph.js"
import addSubgraphConstraints from "./add-subgraph-constraints.js"
import { maxRank, buildLayerMatrix } from "../util.js"

/*
 * Applies heuristics to minimize edge crossings in the graph and sets the best
 * order solution as an order attribute on each node.
 *
 * Pre-conditions:
 *
 *    1. Graph must be DAG
 *    2. Graph nodes must be objects with a "rank" attribute
 *    3. Graph edges must have the "weight" attribute
 *
 * Post-conditions:
 *
 *    1. Graph nodes will have an "order" attribute based on the results of the
 *       algorithm.
 */
function order(g) {
    var mr = maxRank(g),
        downLayerGraphs = buildLayerGraphs(g, _.range(1, mr + 1), "inEdges"),
        upLayerGraphs = buildLayerGraphs(g, _.range(mr - 1, -1, -1), "outEdges");

    var layering = initOrder(g);
    assignOrder(g, layering);

    var bestCC = Number.POSITIVE_INFINITY,
        best;

    for (var i = 0, lastBest = 0; lastBest < 4; ++i, ++lastBest) {
        sweepLayerGraphs(i % 2 ? downLayerGraphs : upLayerGraphs, i % 4 >= 2);

        layering = buildLayerMatrix(g);
        var cc = crossCount(g, layering);
        if (cc < bestCC) {
            lastBest = 0;
            best = _.cloneDeep(layering);
            bestCC = cc;
        }
    }

    assignOrder(g, best);
}

function buildLayerGraphs(g, ranks, relationship) {
    return _.map(ranks, rank => {
        return buildLayerGraph(g, rank, relationship);
    });
}

function sweepLayerGraphs(layerGraphs, biasRight) {
    var cg = new Graph();
    _.forEach(layerGraphs, lg => {
        var root = lg.graph().root;
        var sorted = sortSubgraph(lg, root, cg, biasRight);
        _.forEach(sorted.vs, (v, i) => {
            lg.node(v).order = i;
        });
        addSubgraphConstraints(lg, cg, sorted.vs);
    });
}

function assignOrder(g, layering) {
    _.forEach(layering, layer => {
        _.forEach(layer, (v, i) => {
            g.node(v).order = i;
        });
    });
}

export default order;