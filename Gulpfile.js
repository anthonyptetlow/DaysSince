// var gulp = require('gulp');
// var server = require('gulp-express');
// // require('./client/app')(gulp);
// require('./client/gulp/build')(gulp);


// gulp.task('start', ['build'], function () {
//     // console.log(__dirname);
//     // Start the server at the beginning of the task
//     server.run({
//         file: './server/server.js'
//     });

//     // Restart the server when file changes
//     // gulp.watch(['app/**/*.html'], server.notify);
//     // gulp.watch(['app/styles/**/*.scss'], ['styles:scss']);
//     // gulp.watch(['{.tmp,app}/styles/**/*.css'], ['styles:css', server.notify]);
//     // gulp.watch(['app/scripts/**/*.js'], ['jshint']);
//     // gulp.watch(['app/images/**/*'], server.notify);
//     // gulp.watch(['app.js', 'routes/**/*.js'], [server.run]);
// });

var gulp = require('gulp'),
    server = require('gulp-server-livereload');
require('./gulp/build');

// gulp.task('server', function() {
//   gulp.src('public')
//     .pipe(server({
//       livereload: true,
//       port: 8000
//     }));
// });

