
var config = require('../config');
var path = require('path');
var gulp = require('gulp');
var glob = require('glob');
var browserSync  = require('browser-sync');

var scriptCopyTask = config.tasks.copyScripts; 
var imgCopyTask = config.tasks.copyImg; 
var fontCopyTask = config.tasks.copyFonts; 
var themeCopyTask = config.tasks.copyTheme; 

gulp.task('copyScripts', function () {
		// Vendor scripts
    gulp.src(path.join(config.root.src, scriptCopyTask.src, '**/*.js'))
    .pipe(gulp.dest(path.join(config.root.dest, scriptCopyTask.dest)))
    .pipe(browserSync.stream());
});

gulp.task('copyImg', function () {
    // Images
    gulp.src(path.join(config.root.src, imgCopyTask.src, '**/*'))
    .pipe(gulp.dest(path.join(config.root.dest, imgCopyTask.dest)))
    .pipe(browserSync.stream());
});

gulp.task('copyFonts', function () {
    // Fonts
    gulp.src(path.join(config.root.src, fontCopyTask.src, '**/*'))
    .pipe(gulp.dest(path.join(config.root.dest, fontCopyTask.dest)))
    .pipe(browserSync.stream());
});

gulp.task('copyTheme', function () {
    // Theme source files
    gulp.src(path.join(config.root.src, themeCopyTask.src, '**/*'))
    .pipe(gulp.dest(path.join(config.root.dest, themeCopyTask.dest)))
    .pipe(browserSync.stream());
});