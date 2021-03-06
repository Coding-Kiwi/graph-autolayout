import _ from '../lodash.js'

function addSubgraphConstraints(g, cg, vs) {
    var prev = {},
        rootPrev;

    _.forEach(vs, v => {
        var child = g.parent(v),
            parent,
            prevChild;
        while (child) {
            parent = g.parent(child);
            if (parent) {
                prevChild = prev[parent];
                prev[parent] = child;
            } else {
                prevChild = rootPrev;
                rootPrev = child;
            }
            if (prevChild && prevChild !== child) {
                cg.setEdge(prevChild, child);
                return;
            }
            child = parent;
        }
    });
}

export default addSubgraphConstraints;