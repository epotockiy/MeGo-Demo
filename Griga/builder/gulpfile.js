const gulp = require('gulp');
const sass = require('gulp-sass');


gulp.task('sass', function() {
  return gulp.src('../app/sass/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('../app/css'));
});


// gulp.task('hel' , function() {
// 	console.log("hello");
// });


// gulp.task('default' , ['hel']);
