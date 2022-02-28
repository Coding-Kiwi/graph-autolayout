const path = require("path");
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: path.resolve(__dirname, "index.js"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "graph-autolayout.js",
        library: "GraphAutolayout",
        libraryTarget: "umd",
        libraryExport: "default"
    },
    module: {
        rules: [{
            test: /\.(js)$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
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