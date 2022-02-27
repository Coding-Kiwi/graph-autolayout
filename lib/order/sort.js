import _ from '../lodash.js'
import { partition } from '../util.js'

function sort(entries, biasRight) {
    var parts = partition(entries, entry => _.has(entry, "barycenter"));

    var sortable = parts.lhs,
        unsortable = _.sortBy(parts.rhs, entry => -entry.i),
        vs = [],
        sum = 0,
        weight = 0,
        vsIndex = 0;

    sortable.sort(compareWithBias(!!biasRight));

    vsIndex = consumeUnsortable(vs, unsortable, vsIndex);

    _.forEach(sortable, entry => {
        vsIndex += entry.vs.length;
        vs.push(entry.vs);
        sum += entry.barycenter * entry.weight;
        weight += entry.weight;
        vsIndex = consumeUnsortable(vs, unsortable, vsIndex);
    });

    var result = { vs: _.flatten(vs, true) };
    if (weight) {
        result.barycenter = sum / weight;
        result.weight = weight;
    }
    return result;
}

function consumeUnsortable(vs, unsortable, index) {
    var last;
    while (unsortable.length && (last = _.last(unsortable)).i <= index) {
        unsortable.pop();
        vs.push(last.vs);
        index++;
    }
    return index;
}

function compareWithBias(bias) {
    return (entryV, entryW) => {
        if (entryV.barycenter < entryW.barycenter) {
            return -1;
        } else if (entryV.barycenter > entryW.barycenter) {
            return 1;
        }

        return !bias ? entryV.i - entryW.i : entryW.i - entryV.i;
    };
}

export default sort;