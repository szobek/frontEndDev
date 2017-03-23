'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var minify = require('gulp-minify');
var concat = require('gulp-concat');

var cdir = './front_end/angular/components/';
var ctrldir = './front_end/js/controllers/';
var oDir = "./front_end/other_js/";

var config = {
    sassFiles : "./front_end/sass/*.sass",
    watchedFiles : "./front_end/**/*.js",
    jsFiles : "./front_end/js/*.js",
    angularComponentsDir: './front_end/angular/components/',
    otherJsDir: './front_end/other_js/',
    componentFiles: [
        cdir+'angular.min.js',
        cdir+'angular-route.min.js',
        cdir+'angular-messages.min.js',
        cdir+'angular-resource.min.js',
        cdir+'angular-touch.min.js',
        cdir+'angular-sanitize.min.js'

    ],
    controllerFiles: [
        ctrldir+'general_functions.js',
        ctrldir+'homeController.js',
        ctrldir+'appController.js',
        ctrldir+'createController.js',
        ctrldir+'setupController.js'
    ],
    otherJsFiles: [
        oDir+'jquery.min.js',
        oDir+'bootstrap.min.js',
        oDir+'moment-with-locales.min.js'
    ]
};

gulp.task('concatAngularComponentJs', function() {
    return gulp.src(config.componentFiles)
        .pipe(concat('all-angular-component.js'))
        .pipe(gulp.dest('./www/js/min/'));
});

gulp.task('concatAngularControllers', function() {
    return gulp.src(config.controllerFiles)
        .pipe(concat('angular-controllers-concat.js'))
        .pipe(gulp.dest(ctrldir+'temp/'))
        .pipe(minify({
            ext:{
                src:'-debug.js',
                min:'.min.js'
            }
        }).on('error',function() {console.log("hiba van")}))
        .pipe(gulp.dest('./www/js/min/'));

});



gulp.task('concatOtherJs', function() {
    return gulp.src(config.otherJsFiles)
        .pipe(concat('other-all.js'))
        .pipe(gulp.dest('./www/js/min/'));
});


gulp.task('sass_inner', function () {
    return gulp.src('./front_end/sass/base.sass')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./www/css/min'));
});


gulp.task('js', function() {
    gulp.src(config.jsFiles)
        .pipe(minify({
            ext:{
                src:'-debug.js',
                min:'.min.js'
            }
        }).on('error',function() {console.log("hiba van")}))
        .pipe(gulp.dest('./www/js/min'))
});



gulp.task('watch', function () {
    // gulp.watch(config.jsFiles, ['js','concatOtherJs','concatAngularComponentJs','concatAngularControllers']);
    gulp.watch(config.watchedFiles, ['js','concatOtherJs','concatAngularComponentJs','concatAngularControllers']);
    gulp.watch(config.sassFiles, ['sass_inner']);

});
