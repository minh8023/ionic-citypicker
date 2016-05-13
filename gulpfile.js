var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var css2js = require("gulp-css2js");
var minifyHtml = require("gulp-minify-html");
var ngHtml2Js = require("gulp-ng-html2js");
var uglify = require('gulp-uglify');

gulp.task('html2js', function () {
    return gulp.src(['./src/templates/ionic-citypicker.html'])
        .pipe(minifyHtml())
        .pipe(ngHtml2Js({
            moduleName: "ionic-citypicker.templates"
        }))
        .pipe(concat("templates.js"))
        .pipe(uglify())
        .pipe(gulp.dest("./dist"));
});

gulp.task('css2js', function () {
    return gulp.src("./src/style/ionic-citypicker.css")
        .pipe(css2js())
        .pipe(uglify())
        .pipe(gulp.dest("./dist/"));
});

gulp.task('minify-all', ['delete-dist', 'html2js', 'css2js'], function () {
    return gulp.src(['./dist/*.js', './src/js/*.js'])
        .pipe(concat('ionic-citypicker.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/'));
});

gulp.task('delete-dist', function () {
    del(['dist/*']);
});

gulp.task('delete-trash', ['minify-all'], function () {
    del(['dist/templates.js', 'dist/ionic-citypicker.js']);
});

gulp.task('default', ['delete-trash'], function () {});
