const path = require("path");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, "index.js"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "dagre-graph.js",
        library: "DagreGraph",
        libraryTarget: "umd",
        globalObject: "this",
        publicPath: '/',
    },
    module: {
        rules: [{
            test: /\.(js)$/,
            exclude: /node_modules/,
            use: "babel-loader",
            options: {
                presets: ['@babel/preset-env'],
                plugins: ['@babel/plugin-lodash']
            }
        }],
    },
    mode: "production",
    optimization: {
        minimizer: [new TerserPlugin({
            extractComments: false
        })],
    }
}