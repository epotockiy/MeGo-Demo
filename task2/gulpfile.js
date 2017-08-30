const gulp = require('gulp');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

gulp.task('sass', function() {
  return gulp.src('./app/sass/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('./public/css'));
});


gulp.task('js', function() {
   return gulp.src([
                './app/js/accordeon.js',
                './app/js/mobile-menu.js',
                './app/js/slider-qoute.js',
                './app/js/slider-testimonial.js'
        ]) 
        .pipe(concat('main.min.js')) // склеиваем все JS
        .pipe(uglify()) 
        .pipe(gulp.dest('./public/js/')) // результат пишем по указанному адресу
});

gulp.task('default' , ['sass' , 'js']);



