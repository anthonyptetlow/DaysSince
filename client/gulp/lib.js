var gulp = require('gulp');

gulp.task('lib', function () {
	gulp.src([__dirname + '/../src/lib/bootstrap/dist/css/bootstrap.css'])
		.pipe(gulp.dest(__dirname + '/../build/styles/lib/'));

	gulp.src([__dirname + '/../src/lib/bootstrap/fonts/*'])
		.pipe(gulp.dest(__dirname + '/../build/styles/fonts/'));

	return gulp.src([__dirname + '/../src/lib/angular/angular.js',
	 	__dirname + '/../src/lib/angular-ui-router/release/angular-ui-router.js',
	 	__dirname + '/../src/lib/angular-resource/angular-resource.js'])
		.pipe(gulp.dest(__dirname + '/../build/js/lib'))
		.on('error', function (error) {
	        console.error(String(error));
	    });
});