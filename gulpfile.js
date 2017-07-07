var gulp   = require('gulp');
var sass   = require('gulp-sass');
var concat = require('gulp-concat');
var clean  = require('gulp-clean');

gulp.task('clean', function() {
	return gulp.src('build/', { read: false })
		.pipe(clean());
});

gulp.task('html', function() {
  return gulp.src('src/*.html')
    .pipe(gulp.dest('build'));
});

gulp.task('images', function() {
  return gulp.src('src/images/**/*.png')
    .pipe(gulp.dest('build/images'));
});

gulp.task('sass', function() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass())
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('build/css'));
});

gulp.task('watch', ['html', 'images', 'sass'], function() {
  gulp.watch('src/*.html', ['html']);
  gulp.watch('src/scss/**/*.scss', ['sass']);
});

gulp.task('build', ['html', 'images', 'sass']);

gulp.task('default', ['build', 'watch']);
