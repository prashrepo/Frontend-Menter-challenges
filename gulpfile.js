const gulp = require('gulp'),
      sass = require('gulp-sass'),
      postcss = require('gulp-postcss'),
      autoprefixer = require('autoprefixer'),
      cssnano = require('cssnano');



function style() {
        return gulp.src('./sass/**/*.scss')
        .pipe(sass())
        .pipe(postcss([ autoprefixer(
          {
            browsers: ['last 4 versions'],
            cascade: false,
            grid: "autoplace"
          }
        ), cssnano()]))
        .pipe(gulp.dest('./css'))
      };

// for build version type gulp copy

function copy() {
    return gulp.src([
        'index.html',
        'css/**/*',
        'images/**/*',
        'js/**/*',
        'webfonts/**/*',
      ], {
          base: './'
      }).pipe(gulp.dest('./dist'));
  };

gulp.task('copy', copy);

// for dev version type gulp
exports.default = function () {
  gulp.watch('./sass/**/*.scss', style);
}