/**
 * lodash functions used in the code, replaced with vanilla js counterparts
 */

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
    forEach: (arr, func) => {
        if (arr == null) return arr;
        if (Array.isArray(arr)) {
            arr.forEach(func)
        } else {
            for (const key in arr) {
                if (Object.hasOwnProperty.call(arr, key)) {
                    func(arr[key], key);
                }
            }
        }
    },
    map: (arr, func) => {
        let itaree = func;
        if (typeof itaree === "string") {
            itaree = v => v[func];
        }

        return Array.isArray(arr) ? arr.map(itaree) : Object.values(arr).map(itaree);
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
    has(obj, path) {
        return obj != null && Object.hasOwnProperty.call(obj, path);
    },
    sortBy(arr, func) {
        let a = [...arr];

        if (func instanceof Function) return a.sort((a, b) => {
            if (func(a) < func(b)) return -1;
            if (func(a) > func(b)) return 1;
            return 0;
        });

        if (typeof func === "undefined") {
            if (!isNaN(a[0])) {
                return a.sort(function(a, b) { return a - b; });
            } else {
                return a.sort();
            }
        }

        if (typeof func === "string") return a.sort((a, b) => {
            if (a[func] < b[func]) return -1;
            if (a[func] > b[func]) return 1;
            return 0;
        });

        if (Array.isArray(func) && typeof func[0] === "string") {
            return a.sort((a, b) => {
                for (const str of func) {
                    if (a[str] !== b[str]) {
                        if (a[str] < b[str]) return -1;
                        if (a[str] > b[str]) return 1;
                    }
                }

                return 0;
            });
        }
    },
    forIn(obj, func) {
        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                func(obj[key], key, obj);
            }
        }
    },
};