var gulp    = require('gulp'),
    gutil   = require('gulp-util'),
    uglify  = require('gulp-uglify'),
    concat  = require('gulp-concat'),
    del     = require('del'),
    minifyHTML = require('gulp-minify-html'),
    minifyCSS  = require('gulp-minify-css'),
    nodemon = require('gulp-nodemon'),
    jshint = require('gulp-jshint');



gulp.task('minify', function () {
   gulp.src('public/assets/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('minified/assets/js'));
  
 

  gulp.src('public/assets/css/*.css')
   .pipe(minifyCSS({keepBreaks:true}))
   .pipe(gulp.dest('minified/css'))
});

gulp.task('clean', function(cb) {
  del(['minified/*'], cb);
});

// Creo que las dos tareas no se pueden poner

gulp.task('lint', function () {
  gulp.src('./public/*.js')
    .pipe(jshint())
})
 
gulp.task('develop', function () {
  nodemon({ script: 'app.js'
          , ext: 'html js'
          , tasks: ['lint'] })
    .on('restart', function () {
      console.log('restarted!')
    })
})