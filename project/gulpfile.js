var gulp = require("gulp");
var babel = require("gulp-babel");
var del = require('del');
var less = require("gulp-less");
var replace = require('gulp-replace');
var webpack = require("gulp-webpack");

gulp.task('default', ['server', 'browser', 'public']);

// Server Code Steps

gulp.task('server', [
	'html',
	'compile-server-less',
	'compile-server-jsx',
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
gulp.task("compile-server-jsx", ['compile-server-less'], function () {
	return gulp.src("src/**/*.jsx")
		.pipe(babel())
		.pipe(gulp.dest("target/server"));
});

// Browser Code Steps

gulp.task('browser',[
	'webpack',
	'compile-browser-less',
	'compile-browser-jsx',
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

// Public Steps

gulp.task('public', ['html', 'webpack'])

// Run webpack on the /target/browser folder
gulp.task('webpack', ['compile-browser-jsx'], function(){
	return gulp.src('./target/browser/app.js')
		.pipe(webpack(require('./webpack.config.js')))
		.pipe(gulp.dest(''));
});

// Copy the page so that we can serve it.
gulp.task('html', function(){
	return gulp.src("src/**/*.html")
		.pipe(gulp.dest('target/public'));
});

gulp.task('clean', () => {
	del(['target/**/*']).then(function (paths) {
		console.log('Deleted files/folders:\n', paths.join('\n'));
	});
})
