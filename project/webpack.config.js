var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');
var BowerWebpackPlugin = require("bower-webpack-plugin");

module.exports = {
    entry: "./target/browser/app.js",
    output: {
        path: __dirname,
        filename: "target/public/bundle.js",
    },
    resolve: {
        root: path.resolve(__dirname, './target'),
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
        ]
    },
    plugins: [
        new ExtractTextPlugin("./target/public/bundle.css"),
        new BowerWebpackPlugin({
          modulesDirectories: ["target/web_modules"],
        }),
    ]
};
