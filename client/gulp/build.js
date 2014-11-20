var gulp = require('gulp'),
	concat = require('gulp-concat'),
	clean = require('gulp-clean'),
	less = require('gulp-less'),
	jshint = require('gulp-jshint');
	// stylish = require('jshint-stylish');


module.exports = function (gulp) {
	
'use strict';
	gulp.task('script', function() {
		return gulp.src([__dirname + '/../src/**.*.app.js',__dirname + '/../src/**/*.js', '!' + __dirname + '/../src/lib/**/*.js'])
			.pipe(jshint())
		    .pipe(jshint.reporter('jshint-stylish'))
			.pipe(concat('app.js'))
			.pipe(gulp.dest(__dirname + '/../build/js'))
			.on('error', function (error) {
	            console.error(String(error));
	        });
	});

	gulp.task('lib', function () {
		gulp.src([__dirname + '/../src/lib/bootstrap/dist/css/bootstrap.css'])
			.pipe(gulp.dest(__dirname + '/../build/styles/lib/'));
		return gulp.src([__dirname + '/../src/lib/angular/angular.js',
		 	__dirname + '/../src/lib/angular-ui-router/release/angular-ui-router.js'])
			.pipe(gulp.dest(__dirname + '/../build/js/lib')).on('error', function (error) {
	            console.error(String(error));
	        });
	});

	gulp.task('html', function() {
		return gulp.src(__dirname + '/../src/**/*.html')
			.pipe(gulp.dest(__dirname + '/../build/'));
	});

	gulp.task('styles', function() {
		return gulp.src(__dirname + '/../src/less/**/*.less')
			.pipe(less())
			.pipe(concat('core.css'))
			.pipe(gulp.dest(__dirname + '/../build/styles/'));
	});

	gulp.task('assets', function() {
		return gulp.src('src/assets/**/*.*')
			.pipe(gulp.dest(__dirname + '/../build/assets/'));
	});

	gulp.task('watch', function () {
		gulp.watch(__dirname + '/../src/js/**/*.js', ['script']);
		gulp.watch(__dirname + '/../src/**/*.html', ['html']);
		gulp.watch(__dirname + '/../src/less/**/*.less', ['styles']);
		gulp.watch(__dirname + '/../src/assets/*', ['assets']);
	});

	gulp.task('clean', function (cb) {
		gulp.src([
			__dirname + '/../build/*'
			]).pipe(clean());
		cb();
	});

	gulp.task('build', ['clean', 'lib', 'script', 'html', 'styles', 'assets', 'watch']);
}