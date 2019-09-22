// Initialize modules
// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const { src, dest, watch, series, parallel } = require('gulp');
// Importing all the Gulp-related packages we want to use
const sourcemaps = require('gulp-sourcemaps'),
      sass = require('gulp-sass'),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify'),
      postcss = require('gulp-postcss'),
      autoprefixer = require('autoprefixer'),
      cssnano = require('cssnano'),
      cachebust = require('gulp-cache-bust'),
      imagemin  = require( 'gulp-imagemin' ),
      changed = require( 'gulp-changed' ),
      browserSync  = require( 'browser-sync' ).create(),
      reload  = browserSync.reload;

// File paths
const files = { 
    cssPath: 'src/css/',
    scssPath: 'src/scss/**/*.scss',
    jsPath: 'src/js/**/*.js',
    vendor: 'src/vendor/**/*',
    cssVendor: 'src/vendor/**/*.css',
    jsVendor: 'src/vendor/**/*.js'
}

const imgSRC = 'src/images/*',
      imgDEST = 'dist/images/';

// Sass task: compiles the style.scss file into style.css
function scssTask(){    
    return src(files.scssPath)
        .pipe(sourcemaps.init({loadMaps: true})) // initialize sourcemaps first
        .pipe(sass()) // compile SCSS to CSS
        .pipe(postcss([autoprefixer(), cssnano() ])) // PostCSS plugins
        .pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
        .pipe(dest(files.cssPath)
    ); // put final CSS in dist folder
}

function concatCSS() {
    return src([files.cssVendor , 'src/css/*.css'])
    .pipe(sourcemaps.init({loadMaps: true, largeFile: true}))
    .pipe(concat('style.min.css'))
    .pipe(sourcemaps.write('./maps/'))
    .pipe(dest('dist'));
  }

// JS task: concatenates and uglifies JS files to script.js
function jsTask(){
    return src([
        files.jsVendor ,
        files.jsPath
        ])
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(dest('dist')
    );
}
// Cachebust
function cacheBustTask(){
    return src('./*.html')
    .pipe(cachebust({
        type: 'timestamp'
    }))
    .pipe(dest('./'));
}

function imgmin() {
    return src(imgSRC)
    .pipe(changed(imgDEST))
        .pipe( imagemin([
          imagemin.gifsicle({interlaced: true}),
          imagemin.jpegtran({progressive: true}),
          imagemin.optipng({optimizationLevel: 5})
        ]))
        .pipe( dest(imgDEST));
  }

function watchTask(){
    browserSync.init({
        server: {
            baseDir: "./"
        },
        open: 'external',
        port: 8080,
      });
    watch([files.scssPath,files.cssVendor ],series(scssTask, concatCSS));    
    watch([files.jsPath, files.jsVendor], jsTask);
    watch('src/**/*',cacheBustTask);    
    watch(imgSRC, imgmin); 
    watch(['./src/**/*','index.html']).on('change', browserSync.reload)   
}


// type gulp build for dist

const build = series(scssTask, concatCSS,jsTask,imgmin);
exports.build = build;

exports.scssTask = scssTask;
exports.concatCSS = concatCSS;
exports.jsTask = jsTask;
exports.watchTask = watchTask;
exports.imgmin = imgmin;
exports.cacheBustTask = cacheBustTask;

exports.default = parallel(watchTask);
// exports.default = parallel(build);

