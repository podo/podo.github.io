var gulp = require('gulp');

var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var clean = require('gulp-clean');
var livereload = require('gulp-livereload');
var lr = require('tiny-lr');
var server = lr();

gulp.task('styles', function() {
  return gulp.src('scss/**/*.scss')
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('css'))
    .pipe(livereload(server));
});

gulp.task('html', function() {
  return gulp.src('**/*.html')
    .pipe(gulp.dest(''))
    .pipe(livereload(server));
});

gulp.task('clean', function() {
  return gulp.src(['css', 'js', 'img'], {read: false}).pipe(clean());
});

gulp.task('default', ['clean'], function() {
  gulp.start('styles', 'html');
});

gulp.task('watch', function() {
  server.listen(35729, function(err){
    if(err) return console.log(err);

    gulp.watch('scss/**/*.scss', ['styles']);
    gulp.watch('**/*.html', ['html']);
  });
});
