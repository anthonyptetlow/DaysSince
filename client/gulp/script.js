var gulp = require('gulp'),
	concat = require('gulp-concat'),
	jshint = require('gulp-jshint');

gulp.task('script', function() {
	return gulp.src([__dirname + '/../src/**.*.app.js', __dirname + '/../src/**/*.js', '!' + __dirname + '/../src/lib/**/*.js'])
		.pipe(jshint())
	    .pipe(jshint.reporter('jshint-stylish'))
		.pipe(concat('app.js'))
		.pipe(gulp.dest(__dirname + '/../build/js'))
		.on('error', function (error) {
            console.error(String(error));
        });
});