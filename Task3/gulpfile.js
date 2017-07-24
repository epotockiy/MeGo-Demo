'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var rigger = require('gulp-rigger');
var rimraf = require('rimraf');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var cssnano = require('gulp-cssnano');
var format = require("gulp-standard-format");
var prettify = require('gulp-js-prettify');
var path = {
  build: {
    html: 'build/',
    js: 'build/js/',
    css: 'build/css/',
    img: 'build/img/',
    fonts: 'build/fonts/'
  },
  src: {
    html: 'src/*.html',
    format: 'src/js/',
    js: 'src/js/main.js',
    style: 'src/style/main.scss',
    img: 'src/img/*.*',
    fonts: 'src/fonts/**/*.*'
  },
  watch: {
    html: 'src/**/*.html',
    js: 'src/js/**/*.js',
    style: 'src/style/**/*.scss',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*'
  },
  clean: './build'
};

var config = {
  server: {
    baseDir: './build'
  },
  tunnel: true,
  host: 'localhost',
  port: 9000,
  logPrefix: 'sasin'
};

gulp.task('webserver', function() {
  browserSync(config);
});

gulp.task('clean', function(cb) {
  rimraf(path.clean, cb);
});

gulp.task('html:build', function() {
  gulp.src(path.src.html)
  .pipe(rigger())
  .pipe(gulp.dest(path.build.html))
  .pipe(reload({
    stream: true
  }));
});

gulp.task('js:build', function() {
  gulp.src(path.src.js)
  .pipe(rigger())
  .pipe(sourcemaps.init())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(path.build.js))
  .pipe(reload({
    stream: true
  }));
});

gulp.task('style:build', function() {
  gulp.src(path.src.style)
  .pipe(sourcemaps.init())
  .pipe(sass({
    includePaths: ['src/style/'],
    sourceMap: true,
    errLogToConsole: true
  }))
  .pipe(cssnano())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(path.build.css))
  .pipe(reload({
    stream: true
  }));
});

gulp.task('img:build', function() {
  gulp.src(path.src.img)
  .pipe(gulp.dest(path.build.img))
  .pipe(reload({
    stream: true
  }));
});

gulp.task('fonts:build', function() {
  gulp.src(path.src.fonts)
  .pipe(gulp.dest(path.build.fonts));
});

gulp.task('build', [
  'html:build',
  'js:build',
  'style:build',
  'fonts:build',
  'img:build'
  ]);

gulp.task('watch', function() {
  watch([path.watch.html], function(event, cb) {
    gulp.start('html:build');
  });
  watch([path.watch.style], function(event, cb) {
    gulp.start('style:build');
  });
  watch([path.watch.js], function(event, cb) {
    gulp.start('js:build');
  });
  watch([path.watch.img], function(event, cb) {
    gulp.start('img:build');
  });
  watch([path.watch.fonts], function(event, cb) {
    gulp.start('fonts:build');
  });
});

gulp.task('default', ['build', 'webserver', 'watch']);