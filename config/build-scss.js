var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var uglifycss = require('gulp-uglifycss');

var cssDestFolder = '../built';
gulp.slurped = false;

/* ----------------------------- Complied CSS -----------------------------*/
gulp.task('complie-scss', function() {
    return gulp.src([
            '../src/scss/b-components.scss'
        ])
        .pipe(sass().on('error', sass.logError))
        .pipe(rename('b-components.min.css'))
        .pipe(uglifycss())
        .pipe(gulp.dest(cssDestFolder));
});

gulp.task('watch-complie-scss', function () {
    gulp.watch(['../src/scss/**/*'], ['complie-scss']);
});