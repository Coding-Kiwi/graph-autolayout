import map from "lodash/map"
import forEach from "lodash/forEach"
import has from "lodash/has"
import uniqueId from "lodash/uniqueId"
import range from "lodash/range"
import merge from "lodash/merge"
import pick from "lodash/pick"
import min from "lodash/min"
import minBy from "lodash/minBy"
import max from "lodash/max"
import mapValues from "lodash/mapValues"
import zipObject from "lodash/zipObject"
import sortBy from "lodash/sortBy"
import cloneDeep from "lodash/cloneDeep"
import filter from "lodash/filter"
import forIn from "lodash/forIn"
import find from "lodash/find"
import each from "lodash/each"
import union from "lodash/union"

export default {
    isUndefined(a) {
        return typeof a === "undefined";
    },
    isEmpty(obj) {
        return [Object, Array].includes((obj || {}).constructor) && !Object.entries((obj || {})).length;
    },
    keys(obj) {
        return Object.keys(obj);
    },
    values(obj) {
        return Object.values(obj);
    },
    reduce(arr, func) {
        return arr.reduce(func);
    },
    last(arr) {
        return arr[arr.length - 1];
    },
    defaults(a, b) {
        return Object.assign({}, b, a);
    },
    constant(value) {
        return function() {
            return value;
        };
    },
    flatten(arr) {
        return arr.reduce((a, b) => a.concat(b), []);
    },
    map,
    forEach,
    has,
    uniqueId,
    range,
    merge,
    pick,
    min,
    minBy,
    max,
    mapValues,
    zipObject,
    sortBy,
    cloneDeep,
    filter,
    forIn,
    find,
    each,
    union
};