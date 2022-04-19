const gulp = require('gulp');
const gulpPug = require('gulp-pug');

const src = 'src/**/*.pug';

function html() {
  return gulp.src(src)
    .pipe(gulpPug())
    .pipe(gulp.dest('public'))
};

function watch() {
  return gulp.watch(src, html);
};

exports.default = gulp.series(html, watch);