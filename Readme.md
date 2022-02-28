# graph-autolayout

## Lightweight version of [dagrejs](https://github.com/dagrejs/dagre)

Original [dagre.min.js](https://github.com/dagrejs/dagre/blob/master/dist/dagre.min.js) : ~277KB

Reduced [graph-autolayout.js](https://github.com/dagrejs/dagre/blob/master/dist/dagre.min.js) : ~36KB

### zero dependency
- reduced versions of dagrejs/dagre included
- reduced version of dagrejs/graphlib included
- lodash replaced with vanillajs variants

### lightweight
- ES6 imports/exports
- Webpack treeshaking
- Babel

## Example

![example graph](https://git.codingkiwi.de/codingkiwi/graph-autolayout/raw/branch/master/example/example.png)
[example.html](https://git.codingkiwi.de/codingkiwi/graph-autolayout/src/branch/master/example/index.html)

## Usage

```js
let graph = GraphAutolayout.json({
    "a": { label: "a", width: 80, height: 36 },
    "b": { label: "b", width: 80, height: 36 },
    "c": { label: "c", width: 80, height: 36 },
    "d": { label: "d", width: 80, height: 36 },
    "e": { label: "e", width: 80, height: 36 },
    "f": { label: "f", width: 80, height: 36 },
    "g": { label: "g", width: 80, height: 36 },
    "h": { label: "h", width: 80, height: 36 },
},[
    ["a", "b"],
    ["a", "c"],
    ["b", "d"],
    ["c", "d"],
    ["d", "e"],
    ["e", "h"],
    ["a", "f"],
    ["a", "g"],
    ["g", "h"],
    ["f", "h"],
], {
    rankdir: "LR",
    ranker: 'network-simplex',
    nodesep: 35,
    edgesep: 10,
    ranksep: 75
});

// Output
{
    nodes: [
        {
            height: 36
            id: "a"
            label: "a"
            width: 80
            x: 40
            y: 185.25
        },
        ...
    ],
    edges: [
        from: <node>,
        to: <node>,
        points: [
            {x: 48.34080717488789, y: 167.25},
            {x: 117.5, y: 18},
            {x: 155, y: 18}
        ]
    ],
    graph: <graphlib>,
    width: 700,
    height: 238.75
}
```