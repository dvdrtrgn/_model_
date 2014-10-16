/*jslint es5:true, white:false */
/*globals console, require, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
// http://gulpjs.com/
var pkg    = require('./package.json');
var gulp   = require('gulp');
var gutil  = require('gulp-util');
var concat = require('gulp-concat');
var header = require('gulp-header');
var jshint = require('gulp-jshint');
var reload = require('gulp-livereload');
var sass   = require('gulp-sass');
var serve  = require('gulp-serve');
var uglify = require('gulp-uglify');
var info   = '// <%= pkg.name %>@v<%= pkg.version %>, <%= pkg.repository.url %>\n';
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
(function (x) {
    var i, a = [];
    for (i in x) {
        a.push([i, x[i]]);
    }
    console.log(a);
}(gulp));
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
gulp.task('js', function () {
    gulp.src('scripts/*.js') //
    .pipe(uglify()) //
    .pipe(header(info, { pkg : pkg }))
    .pipe(concat('all.js')) //
    .pipe(gulp.dest('app/build'));
});

gulp.task('watch', function () {
    reload.listen();
    gulp.watch('build/**').on('change', reload.changed);
    gulp.watch('scripts/*.js', ['js']);
});

gulp.task('blab', function () {
    gulp.watch(['***'], function (event) {
        console.log(['File', event.path, 'was', event.type].join(' '));
    });
});

gulp.task('serve', function () {
    serve({
        root: pkg.bases,
        port: pkg.port0,
        middleware: function (req, res) {},
    });
    gulp.watch('build/**').on('change', reload.changed);
});
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
gulp.task('default', function () {});
