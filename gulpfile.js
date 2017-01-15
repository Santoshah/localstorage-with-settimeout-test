var gulp = require('gulp');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var spritesmith  = require('gulp.spritesmith');
var plumber = require('gulp-plumber');


gulp.task('sprite', function() {
    var spriteData = 
        gulp.src('client/images/spr/*.*') 
            .pipe(spritesmith({
                imgName: '../images/sprite.png',
                cssName: '_sprite.scss',
                cssFormat: 'scss',
                algorithm: 'binary-tree',
                cssTemplate: 'handlebarsInheritance.scss.handlebars',
                cssVarMap: function(sprite) {
                    sprite.name = 's-' + sprite.name
                }
            }))          
          

    spriteData.img.pipe(gulp.dest('images/')); 
    spriteData.css.pipe(gulp.dest('client/sass/')); 
});
gulp.task('images', function() {


return gulp.src('client/images/**/*')

    .pipe(cache(imagemin({
        interlaced: true,
        pngquant: true,
        progressive: true
    })))


  // return gulp.src('client/images/**/*')
    // .pipe(imagemin([
    //   // imagemin.gifsicle({interlaced: true}),
    //   imagemin.jpegtran({progressive: true}),
    //   imagemin.optipng(),
    //   // imagemin.svgo([{removeViewBox: false}, {minifyStyles: false}])
    // ], {verbose: true}))

  //   .pipe(cache(imagemin({
  //       interlaced: true
  //     })))

    .pipe(gulp.dest('images'));
});

// gulp.task('clean:dist', function() {
//   return del.sync('dist');
// })

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'D:\/wamp\/www\/angularjs'
    },
  })
})

gulp.task('sass', function () {
  return gulp.src('client/sass/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({
      stream: true
    }))     
});
 

 

// gulp.task('compass', function() {
//   gulp.src('sass/*.scss')
// 	// .pipe(sass({ compass: true, sourcemap: true, style: 'compressed' }))
//     .pipe(compass({
//       config_file: 'config.rb',
//       css: 'css',
//       sass: 'sass',
//       image: 'images'
//     }))
//     .pipe(gulp.dest('css'))
//     .pipe(browserSync.reload({
//       stream: true
//     }))    
//     // .pipe(gulp.dest('app/assets/temp'));
// });

gulp.task('scripts', function() {
    return gulp.src('client/js/*.js')
      .pipe(plumber())
      .pipe(concat('main.js'))
      .pipe(minify())
      .pipe(gulp.dest('build/js'));
});
// gulp.task('clear', function (done) {
//   return cache.clearAll(done);
// });
gulp.task('clean', function() {
  return del.sync('images');
})

gulp.task('cache', function (callback) {
return cache.clearAll(callback)
})

gulp.task('watch',['sprite','scripts','cache','sass','clean','browserSync'], function() {

  gulp.watch('client/js/*.js', ['scripts',browserSync.reload]);
  // gulp.watch('client/images/spr/*.*', ['sprite','clean', browserSync.reload]);
  gulp.watch('client/sass/*.scss', ['sass']);
  // gulp.watch('client/images/**/*', ['images', browserSync.reload]);
  gulp.watch('*.html', browserSync.reload); 

 });
