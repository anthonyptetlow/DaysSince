'use strict';

var gulp = require('gulp'),
	concat = require('gulp-concat'),
	clean = require('gulp-clean'),
	less = require('gulp-less'),
	jshint = require('gulp-jshint');
	// stylish = require('jshint-stylish');

gulp.task('script', function() {
	return gulp.src(['./src/**.*.app.js','./src/**/*.js', '!./src/lib/**/*.js'])
		.pipe(jshint())
	    .pipe(jshint.reporter('jshint-stylish'))
		.pipe(concat('app.js'))
		.pipe(gulp.dest('build/js'))
		.on('error', function (error) {
            console.error(String(error));
        });
});

gulp.task('lib', function () {
	return gulp.src(['./src/lib/angular/angular.js',
	 	'./src/lib/angular-ui-router/release/angular-ui-router.js'])
		.pipe(gulp.dest('./build/js/lib')).on('error', function (error) {
            console.error(String(error));
        });
});

gulp.task('html', function() {
	return gulp.src('./src/**/*.html')
		.pipe(gulp.dest('./build/'));
});

gulp.task('styles', function() {
	return gulp.src('./src/**/*.less')
		.pipe(less())
		.pipe(concat('core.css'))
		.pipe(gulp.dest('./build/styles/'));
});

gulp.task('assets', function() {
	return gulp.src('src/assets/**/*.*')
		.pipe(gulp.dest('./build/assets/'));
});

gulp.task('watch', function () {
	gulp.watch('./src/js/**/*.js', ['script']);
	gulp.watch('./src/**/*.html', ['html']);
	gulp.watch('./src/less/**/*.less', ['styles']);
	gulp.watch('./src/assets/*', ['assets']);
});

gulp.task('clean', function (cb) {
	gulp.src([
		'./build/*'
		]).pipe(clean());
	cb();
});