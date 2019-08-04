

// Dependencies
var gulp = require('gulp');
var sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
var minifyCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var changed = require('gulp-changed');




////////////////
// - SCSS/CSS
////////////////
var SCSS_SRC = './src/Assets/scss/**/*.scss';
var SCSS_DEST = './src/Assets/css';


// Compile SCSS
function style() {
    // 1. where is my scss file
    return gulp.src(SCSS_SRC)
    // 2. pass that file through file compiler
        .pipe(sass().on('error', sass.logError))
        .pipe(minifyCSS())
        .pipe(rename({ suffix: '.min'}))
        .pipe(changed(SCSS_DEST))
    // 3. where do I save the compiled css?
        .pipe(gulp.dest(SCSS_DEST))
}


function watch() {
    gulp.watch(SCSS_SRC, style);
}


exports.style = style;
exports.watch = watch;