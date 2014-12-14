var gulp = require('gulp'),
	less = require('gulp-less'),
	concat = require('gulp-concat');


gulp.task('styles', function() {
	return gulp.src(__dirname + '/../src/less/**/*.less')
		.pipe(less())
		.pipe(concat('core.css'))
		.pipe(gulp.dest(__dirname + '/../build/styles/'))
		.on('error', function (error) {
            console.error(String(error));
        });
});