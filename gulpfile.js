var gulp = require('gulp');
var jsdoc = require("gulp-jsdoc");

gulp.task('default', function() {
  // 将你的默认的任务代码放在这
  gulp.src('./demos/**/*.html')
    .pipe(gulp.dest('./public/demo'));
  gulp.src('./demos/**/*.css')
    .pipe(gulp.dest('./public/demo'));
 gulp.src('./demos/**/*.js')
    .pipe(gulp.dest('./public/demo'));
 gulp.src('./demos/**/*.mp3')
    .pipe(gulp.dest('./public/demo')); 
 gulp.src('./demos/**/*.jpg')
    .pipe(gulp.dest('./public/demo'));
gulp.src('./demos/**/*.png')
    .pipe(gulp.dest('./public/demo')); 

gulp.src('./aboutme/**/*.html')
    .pipe(gulp.dest('./public/about'));
  gulp.src('./aboutme/**/*.css')
    .pipe(gulp.dest('./public/about'));
 gulp.src('./aboutme/**/*.js')
    .pipe(gulp.dest('./public/about'));

 gulp.src('./aboutme/**/*.jpg')
    .pipe(gulp.dest('./public/about'));
gulp.src('./aboutme/**/*.png')
    .pipe(gulp.dest('./public/about'));

});


