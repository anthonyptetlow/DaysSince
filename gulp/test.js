var gulp = require('gulp'),
	protractor = require("gulp-protractor").protractor;


gulp.task('test', function () {
	gulp.src([__dirname + "/../client/tests/*.js"])
	    .pipe(protractor({
	        configFile: __dirname + "/../client/test/conf.js"
	    }))
	    .on('error', function(e) { throw e })
});
