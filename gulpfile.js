var gulp   = require('gulp'),
    gutil  = require('gulp-util'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    sass   = require('gulp-sass'),
    reload = require('gulp-livereload');

gulp.task('js', function () {
    gulp.src('scripts/*.js') //
    .pipe(uglify()) //
    .pipe(concat('all.js')) //
    .pipe(gulp.dest('app/build'));
});

gulp.task('default', function () {
    gulp.watch('scripts/*.js', ['js'])
});
