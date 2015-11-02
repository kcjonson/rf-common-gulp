var gulp = require("gulp");
var webpack = require("gulp-webpack");
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var fs = require('fs')





gulp.task('default', ['server-webpack', 'browser-webpack', 'public']);




// Common Config
// NOTE: There is a better way to do this.
var ALIAS = {'rf-ui': path.resolve(__dirname, '../rf-ui/lib')}
var EXTENSIONS = ['', '.js', '.jsx', 'less', 'css']
var ROOT = path.resolve(__dirname, './src')
var MODULE = {
	loaders: [
		{ test: /\.jsx$/, loader: 'babel' },
		{ test: /\.less$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader", "less-loader") },
		{ test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") }
	]
}
// https://github.com/webpack/webpack/issues/839
// NOTE: Default node modules must be installed or this doesnt work (e.g. fs, path)
var node_modules = fs.readdirSync('node_modules').filter(function(x) { return x !== '.bin' });







//
// Server Code Steps
//

// NOTE: The server bundle is currently still creating a CSS bundle, and it probally doesn't have to
//        However, the null-loader does not appear to be working on components that are resolved via
//		  the alias.  Works great for things in this project, but errors out otherwise.
var SERVER_WEBPACK_CONFIG = {
    output: {
		path: __dirname,
        filename: "target/server/bundle.js",
        libraryTarget: "commonjs2"
    },
    module: MODULE,
    externals: node_modules,
    resolve: {
        root: ROOT,
        extensions: EXTENSIONS,
        alias: ALIAS
    },
    target: 'node',
    plugins: [
        new ExtractTextPlugin("target/server/bundle.css")
    ]
};

gulp.task('server-webpack', function() {
	return gulp.src('./src/server.js')
		.pipe(webpack(SERVER_WEBPACK_CONFIG))
		.pipe(gulp.dest(''));
});





//
// Browser Code Steps
//

var BROWSER_WEBPACK_CONFIG = {
    output: {
		path: __dirname,
        filename: "target/browser/bundle.js"
    },
    module: MODULE,
    externals: node_modules,
    resolve: {
        root: ROOT,
        extensions: EXTENSIONS,
        alias: ALIAS
    },
    plugins: [
        new ExtractTextPlugin("target/browser/bundle.css")
    ]
};

gulp.task('browser-webpack', function() {
	return gulp.src('./src/browser.jsx')
		.pipe(webpack(BROWSER_WEBPACK_CONFIG))
		.pipe(gulp.dest(''));
});











// Public Steps  
// NOTE: This is largely just for the demo project.  Feel free to ignore.

gulp.task('public', ['html'])

// Copy the page so that we can serve it.
gulp.task('html', function(){
	return gulp.src("src/**/*.html")
		.pipe(gulp.dest('target/server'))
		.pipe(gulp.dest('target/browser'));
});


