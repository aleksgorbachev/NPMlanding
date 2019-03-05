var gulp        = require ('gulp'),
    sass        = require ('gulp-sass'),
    browserSync = require ('browser-sync').create();
var reload      = browserSync.reload;
var paths = {
  html: ["app/**/*.html"],
  sass: ["app/sass/**/*.sass"],
  js:   ["app/js/**/*.js"],
};

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "app"
        }
    });
    browserSync.watch('app', browserSync.reload);
    //.on('end', browserSync.reload);
    //Когда таск выполнен произойдет перезагрузка
});

gulp.task('sass', function () {
  return gulp.src(paths.sass)
    .pipe(sass())
     .pipe(gulp.dest('app/css'))
});

gulp.task('html', function () {
  return gulp.src(paths.html)
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, gulp.series('sass')),
  gulp.watch(paths.html, gulp.series('html'))
});

gulp.task('default', gulp.series(
  gulp.parallel('sass', 'html'),
  gulp.parallel('watch', 'serve')
));
