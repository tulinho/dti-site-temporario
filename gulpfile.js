'use strict';

// Include Gulp & tools we'll use
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var series = require('gulp-series');
var merge = require('merge-stream');
var del = require('del');
var runSequence = require('run-sequence');


// Copy all files at the root level (app)
gulp.task('copy', function () {
  var app = gulp.src([
    'app/**/*'
  ]).pipe(gulp.dest('dist'));
  
  var bower = gulp.src([
    'bower_components/**/*.{css,html,js,woff2,woff}',
    '!bower_components/**/index.html',
    '!bower_components/**/{demo,test}/**/*'
  ]).pipe(gulp.dest('dist/bower_components'));
  
  return merge(app, bower)
    .pipe($.size({title: 'Copy files to dist dir:'}));
  
});

// Clean output directory
gulp.task('clean', function (cb) {
  return del('dist', cb);
});

gulp.task('html', function () {  
  return gulp.src(['app/*.html'])
    .pipe($.if('*.html', $.replace('../bower_components', 'bower_components'))) 
    .pipe(gulp.dest('dist'))
    .pipe($.size({title: 'Copy optimized html and assets files to dist dir:'}));
  });  

// Build Production Files, the Default Task
gulp.task('default', function () {
  runSequence('clean', 'copy', 'html');
});