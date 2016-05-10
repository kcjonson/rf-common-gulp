var babel = require('gulp-babel');
var debug = require('gulp-debug');
var gulp = require('gulp');
var lazypipe = require('lazypipe');
var less = require('gulp-less');
var replace = require('gulp-replace');
var watch = require('gulp-watch'); // Uses chokidar under the covers.


var jsPipeline = lazypipe()
	.pipe(replace, '.less', '.css')
	.pipe(babel, {
		modules: "common"
	})
	.pipe(gulp.dest, './lib');

var cssPipeline = lazypipe()
	.pipe(less)
	.pipe(gulp.dest, './lib');

gulp.task('default', ['build']);

gulp.task('build', ['build-js', 'build-css']);

gulp.task('build-js', () => {
	console.log('Starting gulp task: build-js');

	gulp.src("./source/**/*.jsx")
		.pipe(jsPipeline());
});

gulp.task('build-css', function(){
	console.log('Starting gulp task: build-css');
	gulp.src("./source/**/*.less")
		.pipe(cssPipeline())
});

gulp.task('watch', () => {
	gulp.src('source/**/*.jsx')
		.pipe(watch('source/**/*.jsx'))
		.pipe(debug())
		.pipe(jsPipeline())

	return gulp.src('source/**/*.less')
		.pipe(watch('source/**/*.less'))
		.pipe(debug())
		.pipe(cssPipeline())
});
