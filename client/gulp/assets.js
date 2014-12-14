var gulp = require('gulp');

gulp.task('assets', function() {
	return gulp.src('src/assets/**/*.*')
		.pipe(gulp.dest(__dirname + '/../build/assets/'))
		.on('error', function (error) {
            console.error(String(error));
        });
});