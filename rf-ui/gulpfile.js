var gulp = require('gulp');
var babel = require('gulp-babel');
var less = require('gulp-less');
var replace = require('gulp-replace');


gulp.task('default', ['build']);

gulp.task('build', ['build-jsx', 'build-css']);



gulp.task('build-jsx', function(){
	console.log('Starting gulp task: build-js')

	gulp.src("./source/**/*.jsx")
		.pipe(babel({
			modules:"common"
		}))
		.pipe(gulp.dest('./lib'));
})

gulp.task('build-css', function(){
	console.log('Starting gulp task: build-css');
	gulp.src("./source/**/*.less")
		.pipe(less())
		.pipe(gulp.dest('./lib'));
})


gulp.task('index', function(){
	// TODO: This should be automated, not manual.
	gulp.src('./source/index.js')
		.pipe(gulp.dest('./lib'));
});