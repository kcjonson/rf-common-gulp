var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');
var gulp = require("gulp");
var babel = require("gulp-babel");
var less = require("gulp-less");
var replace = require('gulp-replace');
var webpack = require("gulp-webpack");


gulp.task('default', ['server', 'browser', 'public']);




// Server Code Steps

gulp.task('server', [
	'html',
	'compile-server-less',
	'compile-server-jsx',
	'install-server-common-modules-js',
	'intall-server-common-modules-css'
]);

// Compile project source less for server
// CSS Files choke the node imports on the server side, so 
// we're going to rewrite them to valid JS that does nothing.
// This is a total hack.
gulp.task('compile-server-less', function(){
	return gulp.src("src/**/*.less")
		.pipe(replace(/[^]*/, 'module.exports = null;'))
		.pipe(gulp.dest('target/server'))
});

// Compile project source JSX for server
gulp.task("compile-server-jsx", ['compile-server-less', 'install-server-common-modules-js'], function () {
	return gulp.src("src/**/*.jsx")
		.pipe(babel())
		.pipe(gulp.dest("target/server"));
});

// Copy common modules to the node_modules directory
gulp.task("install-server-common-modules-js", ['intall-server-common-modules-css'], function(){
	return gulp.src("../rf-ui/lib/**/*.js")
		.pipe(gulp.dest('node_modules/rf-ui'))
});

// Create stubs for common module css in the node_modules directory
gulp.task("intall-server-common-modules-css", function(){
	return gulp.src("../rf-ui/lib/**/*.css")
		.pipe(replace(/[^]*/, 'module.exports = null;'))
		.pipe(gulp.dest('node_modules/rf-ui'))
});





// Browser Code Steps

gulp.task('browser',[
	'webpack',
	'compile-browser-less',
	'compile-browser-jsx',
	'install-browser-common-modules'
]);

// Compile project source less for browser
gulp.task('compile-browser-less', function() {
	return gulp.src("src/**/*.less")
		.pipe(less())
		.pipe(gulp.dest('target/browser'));
});

// Compile project source JSX for browser
gulp.task("compile-browser-jsx", ['compile-browser-less'], function () {
	return gulp.src("src/**/*.jsx")
		.pipe(replace('.less', '.css'))
		.pipe(babel())
		.pipe(gulp.dest("target/browser"));
});

// Copy common modules into the we_modules folder so that webpack/browser
// dependencies can get them.  
// NOTE: The output from common modules should alredy be compiled, we just copy.
// NOTE: Webpack automatically looks in the web_modules folder, no config needed.
gulp.task("install-browser-common-modules", function(){
	return gulp.src("../rf-ui/lib/**/*")
		.pipe(gulp.dest('target/web_modules/rf-ui'))
})






// Public Steps  

gulp.task('public', ['html', 'webpack'])

var WEBPACK_CONFIG = {
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

// Run webpack on the /target/browser folder
gulp.task('webpack', ['install-browser-common-modules', 'compile-browser-jsx'], function(){
	return gulp.src('./target/browser/app.js')
		.pipe(webpack(WEBPACK_CONFIG))
		.pipe(gulp.dest(''));
});

// Copy the page so that we can serve it.
gulp.task('html', function(){
	return gulp.src("src/**/*.html")
		.pipe(gulp.dest('target/public'));
});


