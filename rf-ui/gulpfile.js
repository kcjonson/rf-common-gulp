var gulp = require('gulp');
var babel = require('gulp-babel');
var less = require('gulp-less');
var replace = require('gulp-replace');
var del = require('del')


gulp.task('default', ['build']);

gulp.task('build', ['build-js', 'build-css']);

gulp.task('build-js', function(){
	console.log('Starting gulp task: build-js')
	return gulp.src("./source/**/*.{js,jsx}")
		.pipe(replace('.less', '.css'))
		.pipe(babel({
			modules:"common"
		}))
		.pipe(gulp.dest('./lib'));
})

gulp.task('build-css', function(){
	console.log('Starting gulp task: build-css');
	return gulp.src("./source/**/*.less")
		.pipe(less())
		.pipe(gulp.dest('./lib'));
})

gulp.task('clean', function(){
	del(['lib/**/*']).then(function (paths) {
		console.log('Deleted files/folders:\n', paths.join('\n'));
	});
})
