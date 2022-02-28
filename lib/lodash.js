import { map, has, merge, sortBy, forIn, forEach } from "lodash"

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
    zipObject(keys, values) {
        return keys.reduce((acc, key, idx) => {
            acc[key] = values[idx]
            return acc
        }, {});
    },
    union: (arr, ...args) => [...new Set(arr.concat(...args))],
    find: (arr, func) => arr.find(func),
    filter: (arr, func) => {
        return Array.isArray(arr) ? arr.filter(func) : Object.values(arr).filter(func);
    },
    max: nums => {
        if (nums.length) return Math.max(...nums)
    },
    min: nums => {
        if (nums.length) return Math.min(...nums)
    },
    minBy: (arr, func) => {
        const min = Math.min(...arr.map(func))
        return arr.find(item => func(item) === min)
    },
    range: (start, end, increment) => {
        const isEndDef = typeof end !== 'undefined';
        end = isEndDef ? end : start;
        start = isEndDef ? start : 0;

        if (typeof increment === 'undefined') {
            increment = Math.sign(end - start)
        }

        const length = Math.abs((end - start) / (increment || 1))

        const { result } = Array.from({ length }).reduce(
            ({ result, current }) => ({
                result: [...result, current],
                current: current + increment,
            }), { current: start, result: [] }
        )

        return result
    },
    uniqueId: (counter => (str = '') => `${str}${++counter}`)(0),
    pick(object, keys) {
        return keys.reduce((obj, key) => {
            if (object && object.hasOwnProperty(key)) {
                obj[key] = object[key];
            }
            return obj;
        }, {});
    },
    mapValues(obj, func) {
        let o = {};
        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                o[key] = func(obj[key], key, obj);
            }
        }
        return o;
    },
    map,
    has,
    merge,
    sortBy,
    forIn,
    forEach
};