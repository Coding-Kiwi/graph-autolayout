import _ from '../lodash.js'

function barycenter(g, movable) {
    return _.map(movable, v => {
        var inV = g.inEdges(v);
        if (!inV.length) {
            return { v: v };
        } else {
            var result = inV.reduce((acc, e) => {
                var edge = g.edge(e),
                    nodeU = g.node(e.v);

                acc.sum += (edge.weight * nodeU.order);
                acc.weight += edge.weight;

                return acc;
            }, { sum: 0, weight: 0 });

            return {
                v: v,
                barycenter: result.sum / result.weight,
                weight: result.weight
            };
        }
    });
}

export default barycenter;