//initialize all of our variables
var app, base, concat, directory, gulp, gutil, hostname, refresh, sass, uglify, imagemin, minifyCSS, del, browserSync, autoprefixer, gulpSequence, shell, sourceMaps, plumber;

var autoPrefixBrowserList = ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'];

//load all of our dependencies
//add more here if you want to include more libraries
gulp        = require('gulp');
gutil       = require('gulp-util');
concat      = require('gulp-concat');
uglify      = require('gulp-uglify');
sass        = require('gulp-sass');
sourceMaps  = require('gulp-sourcemaps');
imagemin    = require('gulp-imagemin');
minifyCSS   = require('gulp-minify-css');
browserSync = require('browser-sync');
autoprefixer = require('gulp-autoprefixer');
gulpSequence = require('gulp-sequence').use(gulp);
shell       = require('gulp-shell');
plumber     = require('gulp-plumber');

import path from 'path';
import nunjucks from 'gulp-nunjucks-render';
import htmlmin from 'gulp-htmlmin';
// import swPrecache from 'sw-precache';
import gulpLoadPlugins from 'gulp-load-plugins';

const wbBuild = require('workbox-build');
const $ = gulpLoadPlugins();

let onError = function (err) {
  gutil.beep();
  gutil.beep();
  gutil.beep();
  console.log(err);
};

//compressing images & handle SVG files
//funs inside image watch task in dev mode
gulp.task('images', function(tmp) {
    gulp.src(['app/images/*.jpg', 'app/images/*.png'])
        //prevent pipe breaking caused by errors from gulp plugins
        .pipe(plumber())
        .pipe(imagemin(
          { optimizationLevel: 5, progressive: true, interlaced: true, verbose: true }
        ))
        .pipe(gulp.dest('app/images'));
});

//compiling our Javascripts
gulp.task('scripts', function() {
    //this is where our dev JS scripts are
    return gulp.src(['app/scripts/src/_includes/**/*.js', 'app/scripts/src/**/*.js'])
                //prevent pipe breaking caused by errors from gulp plugins
                .pipe(plumber())
                //this is the filename of the compressed version of our JS
                .pipe(concat('app.js'))
                //catch errors
                .on('error', gutil.log)
                //where we will store our finalized, compressed script
                .pipe(gulp.dest('app/scripts'))
});

//compiling our SCSS files
gulp.task('styles', function() {
    //the initializer / master SCSS file, which will just be a file that imports everything
    return gulp.src('app/styles/scss/init.scss')
                //prevent pipe breaking caused by errors from gulp plugins
                .pipe(plumber({
                  errorHandler: onError
                }))
                //get sourceMaps ready
                .pipe(sourceMaps.init())
                //include SCSS and list every "include" folder
                .pipe(sass({
                      errLogToConsole: true,
                      includePaths: [
                          'app/styles/scss/'
                      ]
                }))
                .pipe(autoprefixer({
                   browsers: autoPrefixBrowserList,
                   cascade:  true
                }))
                //catch errors
                .on('error', gutil.log)
                //the final filename of our combined css file
                .pipe(concat('styles.css'))
                //get our sources via sourceMaps
                .pipe(sourceMaps.write())
                //where to save our final, compressed css file
                .pipe(gulp.dest('app/styles'));
});

// COMPILES HTML PAGES AND TEMPLATES INTO STD HTML AND PUTS FINISHED FILES INTO THE APP DIR
gulp.task('compileTemplates', () => {
  return gulp.src('app/html/pages/**/*.html')
    /*
    uncomment the following 4 lines if you are planning to use a data.json with
    your nunjucks templates. See: https://github.com/carlosl/gulp-nunjucks-render#example-with-gulp-data
    for an example of how this would work
    */
    // .pipe(data(function() {
    //   // return require('./app/data.json');
    //   return JSON.parse(fs.readFileSync('./app/data.json'));
    // }))
    // compile nunjucks templates and partials
    .pipe(nunjucks({
      path: ['app/html/templates/']
    }))
    .pipe(gulp.dest('app'))
    .pipe(browserSync.reload({stream: true}));
});

// migrating over all required files to the dist folder for deployment
// and run any necessary minification tasks to make code production ready
gulp.task('deploy', function() {
    //grab everything, which should include htaccess, robots, etc
    gulp.src(['app/*', 'app/.*'])
        //prevent pipe breaking caused by errors from gulp plugins
        .pipe(plumber())
        .pipe($.if('*.html', $.htmlmin({
          removeComments: true,
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          removeEmptyAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          removeOptionalTags: true
        })))
        // NEED TO ADD AN HTML MIN TASK HERE
        .pipe(gulp.dest('dist'));

    gulp.src(['app/fonts/**/*', '!app/fonts/README'])
        //prevent pipe breaking caused by errors from gulp plugins
        .pipe(plumber())
        .pipe(gulp.dest('dist/fonts'));

    gulp.src(['app/images/**/*', '!app/images/README'])
        //prevent pipe breaking caused by errors from gulp plugins
        .pipe(plumber())
        .pipe(gulp.dest('dist/images'));

    gulp.src('app/styles/styles.css')
      //minify css files for production build
      .pipe(minifyCSS())
      .pipe(gulp.dest('dist/styles'));

    gulp.src(['app/scripts/*.js'])
      //compress and move to dist folder
      .pipe(plumber({
        errorHandler: onError
      }))
      .pipe(uglify())
      .pipe(gulp.dest('dist/scripts'));

});

//cleans our dist directory in case things got deleted
gulp.task('clean', function() {
    return shell.task([
      'rm -rf dist'
    ]);
});

//create folders using shell
gulp.task('scaffold', function() {
  return shell.task([
      'mkdir dist',
      'mkdir dist/fonts',
      'mkdir dist/images',
      'mkdir dist/scripts',
      'mkdir dist/styles'
    ]
  );
});

gulp.task('bundle-sw', () => {
   return wbBuild.generateSW({
     globDirectory: './dist/',
     swDest: './dist/sw.js',
     globPatterns: ['**\/*.{html,js,css}'],
    //  globIgnores: ['admin.html'],
    //  templatedUrls: {
    //    '/shell': ['shell.hbs', 'main.css', 'shell.css'],
    //  },
   })
   .then(() => {
     console.log('Service worker generated.');
   })
   .catch((err) => {
     console.log('[ERROR] This happened: ' + err);
   });
 })

//run `gulp:serve` to start server running on localhost: 3000
//  startup the web server,
//  start up browserSync
// concatenate and minify css and concatenate js files
gulp.task('serve', ['scripts', 'styles', 'compileTemplates'], () => {
    browserSync({
        server: {
            baseDir: [".tmp", "app/"]
        },
        options: {
            reloadDelay: 250
        },
        notify: false
    });
    //a list of watchers, so it will watch all of the following files waiting for changes
    gulp.watch('app/scripts/src/**/*', ['scripts', browserSync.reload]);
    gulp.watch('app/styles/scss/**/*', ['styles', browserSync.reload]);
    gulp.watch('app/images/**/*', ['images']);
    gulp.watch(['app/html/templates/*', 'app/html/pages/*'], ['compileTemplates']);
});

//this is our deployment task, it will set everything for deployment-ready files
gulp.task('default', gulpSequence('clean', 'scaffold', ['scripts', 'styles', 'compileTemplates'], 'deploy', 'bundle-sw'));

// RUNS THE DEFAULT TASK TO CREATE PRODUCTION READY FILES THEN RUNS ON LOCALHOST:3001
gulp.task('serve:dist', ['default'], () => {
  browserSync({
      server: {
          baseDir: "dist/"
      },
      options: {
          reloadDelay: 250
      },
      port: 3001,
      // Note: this uses an unsigned certificate which on first access
      // will present a certificate warning in the browser. Comment out to run as http instead.
      https: true,
      notify: false
  });
});
