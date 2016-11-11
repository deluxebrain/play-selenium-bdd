var path = require('path');
var gulp = require('gulp');
var selenium = require('selenium-standalone');
var webdriver = require('gulp-webdriver');
var run = require('gulp-run');

gulp.task('selenium', function(done) {
      selenium.install({
            logger: function(message) {}
      }, function(err) {
            if (err) return done(err);
            selenium.start(function(err, child) {
                  if (err) return done(err);
                  selenium.child = child;
                  done();
            });
      });
});

gulp.task('test', ['selenium'], function() {
      return gulp.src(path.join(__dirname, 'wdio.conf.js'))
            .pipe(webdriver()).once('end', function() {
                  selenium.child.kill();
            });
});

gulp.task('report', function() {
      var cmd = 'allure generate ' +
            path.join(__dirname, './allure-results') +
            ' -o ' +
            path.join(__dirname, './public');
      return run(cmd).exec();
});
