var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');
var gulp = require("gulp");
var babel = require("gulp-babel");
var less = require("gulp-less");
var replace = require('gulp-replace');
var webpack = require("gulp-webpack");
var del = require('del');



var WEBPACK_CONFIG = {
    entry: "./target/app.js",
    output: {
        path: __dirname,
        filename: "target-public/bundle.js"
    },
    resolve: {
        root: path.resolve(__dirname, './target/')
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") }
        ]
    },
    plugins: [
        new ExtractTextPlugin("./target-public/bundle.css")
    ]
};







gulp.task('default', ['compile-jsx', 'compile-less', 'webpack', 'html']);

// Compile project source JSX for server
gulp.task("compile-jsx", ['install-common-modules'], function () {
	return gulp.src("src/**/*.jsx")
		.pipe(replace('.less', '.css'))
		.pipe(babel())
		.pipe(gulp.dest("target/"));
});

gulp.task('compile-less', function(){
	return gulp.src("src/**/*.less")
		.pipe(less())
		.pipe(gulp.dest('target/'))
});

// Copy common modules to the node_modules directory
gulp.task("install-common-modules",  function(){
	return gulp.src("../rf-ui/lib/**/*")
		.pipe(gulp.dest('node_modules/rf-ui'))
});

// Run webpack on the /target/browser folder
gulp.task('webpack', ['compile-jsx'], function(){
	return gulp.src('./target/app.js')
		.pipe(webpack(WEBPACK_CONFIG))
		.pipe(gulp.dest(''));
});

// Copy the page so that we can serve it.
gulp.task('html', function(){
	return gulp.src("src/**/*.html")
		.pipe(gulp.dest('target-public/'));
});

gulp.task('clean', function(){
	del(['target/**/*', 'target-public/**/*', 'node_modules/rf-ui']).then(function (paths) {
		console.log('Deleted files/folders:\n', paths.join('\n'));
	});
})

