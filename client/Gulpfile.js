var gulp = require('gulp');


require('./gulp/clean');
require('./gulp/test');
require('./gulp/script');
require('./gulp/html');
require('./gulp/styles');
require('./gulp/assets');
require('./gulp/lib');
require('./gulp/watch');

gulp.task('buildOnce', ['clean', 'lib', 'script', 'html', 'styles', 'assets']);
gulp.task('build', ['buildOnce', 'watch']);
