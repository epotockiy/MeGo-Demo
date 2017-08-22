// ////////////////////////////////////////////////
//
// EDIT CONFIG OBJECT BELOW !!!
//
// jsConcatFiles => list of javascript files (in order) to concatenate
// buildFilesFoldersRemove => list of files to remove when running final build
// // //////////////////////////////////////////////

var config = {
    jsConcatFiles: [

        './app/js/LocalStorageService.js',
        './app/js/TodoList.js',
        './app/js/Main.js'

    ], buildFilesFoldersRemove: [
        'build/scss/',
        'build/workStyles/',
        'build/js/!(*.min.js)',
        'build/bower.json',
        'build/bower_components/',
        'build/maps/'
    ]
};


// ////////////////////////////////////////////////
// Required taskes
// gulp build
// bulp build:serve
// // /////////////////////////////////////////////

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    del = require('del'),
    babel = require('gulp-babel'),
    // ts = require('gulp-typescript'),
    deletefile = require('gulp-delete-file');


// ////////////////////////////////////////////////
// Log Errors
// // /////////////////////////////////////////////

function errorlog(err) {
    console.error(err.message);
    this.emit('end');
}


// ////////////////////////////////////////////////
// Scripts Tasks
// ///////////////////////////////////////////////
gulp.task('scripts', function () {
    return gulp.src(config.jsConcatFiles)
    // return gulp.src(['./app/js/*.ts'])
    // return gulp.src(config.jsConcatFiles)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(concat('app.min.js'))
        .on('error', errorlog)
        .pipe(uglify())
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('./app/js/'))
        .pipe(reload({stream: true}));

});


// ////////////////////////////////////////////////
// Styles Tasks
// ///////////////////////////////////////////////

gulp.task('styles', function () {

    gulp.src('app/scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .on('error', errorlog)
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('app/css'))
        .pipe(reload({stream: true}));
});
// gulp.task('scss', function () {
//     gulp.src('app/workStyles/**/*.css')
//        // .pipe(sourcemaps.init())
//         .pipe(concat('style.min.css'))
//         .pipe(cleanCSS())
//        .on('error', errorlog)
//         .pipe(autoprefixer({
//             browsers: ['last 3 versions'],
//             cascade: false
//         }))
//         .pipe(sourcemaps.write('../maps'))
//         .pipe(gulp.dest('app/css'))
//         .pipe(reload({stream: true}));
// });


// ////////////////////////////////////////////////
// HTML Tasks
// // /////////////////////////////////////////////

gulp.task('html', function () {
    gulp.src('app/**/*.html')
        .pipe(reload({stream: true}));
});


// ////////////////////////////////////////////////
// Browser-Sync Tasks
// // /////////////////////////////////////////////

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: "./app/"
        }
    });
});

// task to run build server for testing final app
gulp.task('build:serve', function () {
    browserSync({
        server: {
            baseDir: "./build/"
        }
    });
});


// ////////////////////////////////////////////////
// Build Tasks
// // /////////////////////////////////////////////

// clean out all files and folders from build folder
gulp.task('build:cleanfolder', function (cb) {
    del([
        'build/**'
    ], cb);
});

// task to create build directory of all files
gulp.task('build:copy', ['build:cleanfolder'], function () {
    return gulp.src('app/**/*/')
        .pipe(gulp.dest('build/'));
});

// task to removed unwanted build files
// list all files and directories here that you don't want included
gulp.task('build:remove', ['build:copy'], function (cb) {
    del(config.buildFilesFoldersRemove, cb);
});

gulp.task('build', ['build:remove']);


// ////////////////////////////////////////////////
// Watch Tasks
// // /////////////////////////////////////////////

gulp.task('watch', function () {
    gulp.watch('app/scss/**/*.scss', ['styles']);
    gulp.watch('app/js/**/*.js', ['scripts']);
    gulp.watch('app/**/*.html', ['html']);
});


gulp.task('default', ['scripts', 'styles', 'html', 'browser-sync', 'watch']);
