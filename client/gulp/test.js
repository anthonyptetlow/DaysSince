var gulp = require('gulp'),
	protractor = require("gulp-protractor").protractor;


gulp.task('test', function () {
	gulp.src([__dirname + "/../tests/*.js"])
	    .pipe(protractor({
	        configFile: __dirname + "/../test/conf.js"
	    })) 
	    .on('error', function(e) { throw e })
});