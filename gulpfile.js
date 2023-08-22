// /**This file will contain all of the tasks that we want Gulp to run for our build. */
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const uglify = require('gulp-uglify');
const useref = require('gulp-useref');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const replace = require('gulp-replace');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();


// Process HTML task
function processHTML() {
  return gulp.src('src/*.html')
    .pipe(useref())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
}

// Process JS task
function processJS() {
  return gulp.src('src/js/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('bundle.js'))
    .pipe(replace(/import\{(.*?)\}from"\.\/(\w+)\.js";|export/g, ''))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
}

// Watch task
function watch() {
  browserSync.init({
    server: {
      baseDir: './dist',
    },
  });

  gulp.watch('src/*.html', processHTML);
  gulp.watch('src/js/*.js', processJS);
}


// Default task 
gulp.task('build', gulp.series(processHTML, processJS, watch));