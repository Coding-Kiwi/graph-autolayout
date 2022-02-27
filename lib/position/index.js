import _ from '../lodash.js'
import { asNonCompoundGraph, buildLayerMatrix } from "../util.js";
import { positionX } from "./bk.js";

function position(g) {
    g = asNonCompoundGraph(g);

    positionY(g);
    _.forEach(positionX(g), (x, v) => {
        g.node(v).x = x;
    });
}

function positionY(g) {
    var layering = buildLayerMatrix(g);
    var rankSep = g.graph().ranksep;
    var prevY = 0;
    _.forEach(layering, layer => {
        var maxHeight = _.max(_.map(layer, v => g.node(v).height));
        _.forEach(layer, v => g.node(v).y = prevY + maxHeight / 2);
        prevY += maxHeight + rankSep;
    });
}

export default position;