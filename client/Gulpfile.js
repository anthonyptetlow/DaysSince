'use strict';

var gulp = require('gulp');

require('require-dir')('./gulp');

gulp.task('build', ['clean', 'lib', 'script', 'html', 'styles', 'assets', 'watch']);
