var gulp = require('gulp');

gulp.task('html', function() {
	return gulp.src(__dirname + '/../src/**/*.html')
		.pipe(gulp.dest(__dirname + '/../build/'));
});