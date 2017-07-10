'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
// var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var rigger = require('gulp-rigger');
var imagemin = require('gulp-imagemin');
// var pngquant = require('imagemin-pngquant');
var rimraf = require('rimraf');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var spritesmith = require('gulp.spritesmith');
// var cssnano = require('gulp-cssnano');
// var postcss = require('gulp-postcss');
// var autoprefixer = require('autoprefixer');

var path = {
  dist: {
    html: 'dist/',
    js: 'dist/js/',
    css: 'dist/css/',
    img: 'dist/img/',
    sprite: 'dist/img/sprite/',
    fonts: 'dist/fonts/'
  },
  app: {
    html: 'app/*.html',
    js: 'app/js/main.js',
    style: 'app/style/common.scss',
    img: 'app/img/*.*',
    sprite: 'app/img/icons/*.*',
    spriteStyle: 'app/style/core/',
    fonts: 'app/fonts/**/*.*'
  },
  watch: {
    html: 'app/**/*.html',
    js: 'app/js/**/*.js',
    style: 'app/style/**/*.scss',
    img: 'app/img/**/*.*',
    sprite: 'app/img/icons/*.*',
    fonts: 'app/fonts/**/*.*'
  },
  clean: './dist'
};

var config = {
  server: {
    baseDir: './dist'
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

gulp.task('html:dist', function() {
  gulp.src(path.app.html)
    .pipe(rigger())
    .pipe(gulp.dest(path.dist.html))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('js:dist', function() {
  gulp.src(path.app.js)
    .pipe(rigger())
    // .pipe(sourcemaps.init())
    // .pipe(uglify())
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.dist.js))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('style:dist', function() {
  gulp.src(path.app.style)
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: ['app/style/'],
      sourceMap: true,
      errLogToConsole: true
    }))
    // .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
    // .pipe(cssnano())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.dist.css))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('sprite:dist', function () {
  var spriteData = gulp.src(path.app.sprite).pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: '_sprite.scss',
    cssFormat: 'scss',
    algorithm: 'binary-tree',
    imgPath: '../img/sprite/sprite.png',
    padding: 2    
  }));
  spriteData.img.pipe(gulp.dest(path.dist.sprite)); // путь, куда сохраняем картинку
  spriteData.css.pipe(gulp.dest(path.app.spriteStyle));
  spriteData.pipe(reload({
      stream: true
    }));
});

gulp.task('img:dist', function() {
  gulp.src(path.app.img)
    .pipe(imagemin())
    .pipe(gulp.dest(path.dist.img))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('fonts:dist', function() {
  gulp.src(path.app.fonts)
    .pipe(gulp.dest(path.dist.fonts));
});

gulp.task('dist', [
  'html:dist',
  'js:dist',
  'style:dist',
  'fonts:dist',
  'sprite:dist',
  'img:dist'
]);

gulp.task('watch', function() {
  watch([path.watch.html], function(event, cb) {
    gulp.start('html:dist');
  });
  watch([path.watch.style], function(event, cb) {
    gulp.start('style:dist');
  });
  watch([path.watch.js], function(event, cb) {
    gulp.start('js:dist');
  });
  watch([path.watch.sprite], function(event, cb) {
    gulp.start('sprite:dist');
  });
  watch([path.watch.img], function(event, cb) {
    gulp.start('img:dist');
  });
  watch([path.watch.fonts], function(event, cb) {
    gulp.start('fonts:dist');
  });
});

gulp.task('default', ['dist', 'webserver', 'watch']);