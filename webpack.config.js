const path = require("path");
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: path.resolve(__dirname, "index.js"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "dagre-graph.js",
        library: "DagreGraph",
        libraryTarget: "umd"
    },
    module: {
        rules: [{
            test: /\.(js)$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['babel-plugin-lodash']
                }
            }
        }],
    },
    mode: "production",
    optimization: {
        usedExports: true
    },
    plugins: [
        //new BundleAnalyzerPlugin()
    ]
}