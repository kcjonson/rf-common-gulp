var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');

module.exports = {
    entry: "./target/browser/app.js",
    output: {
        path: __dirname,
        filename: "target/public/bundle.js"
    },
    resolve: {
        root: path.resolve(__dirname, './target/browser/')
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") }
        ]
    },
    plugins: [
        new ExtractTextPlugin("./target/public/bundle.css")
    ]
};