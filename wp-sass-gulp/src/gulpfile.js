'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var pixrem = require('pixrem');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var autoprefixer = require('autoprefixer-core');
var spritesmith = require('gulp.spritesmith');



// stylesheet stuffs
gulp.task('styles', function () {

	var processors = [
		autoprefixer({browsers: ['last 2 versions', 'ie > 8', '> 5%']}),
		pixrem('10px')
	];

	gulp.src('./scss/**/*.scss')

	.pipe( sass().on('error', sass.logError) )
	.pipe( postcss(processors) )
	.pipe( gulp.dest('../') );

});



// imagemin based stuffs
gulp.task('images', function () {
    return gulp.src('./images/*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('../images'));
});



// auto spriting
gulp.task('sprite', function () {
  var spriteData = gulp.src('./images/sprites/*.png').pipe(spritesmith({
    imgName: 'images/sprite.png',
    cssName: 'scss/inc/_sprite.scss',
    //imgPath: 'images/',
    padding: 2
    //algorithm: 'top-down'
  }));
  return spriteData.pipe(gulp.dest('./'));
});



// JS based 
gulp.task('js-top', function () {
    return gulp.src(['./js/modernizr-2.8.3.custom.js']) 
        .pipe(concat('jstop.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('../js'))

});
gulp.task('js-btm', function () {
    return gulp.src(['!./js/modernizr-2.8.3.custom.js', './js/**/*.js', './js/scripts.js'])
        .pipe(concat('jsbtm.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('../js'))
});


gulp.task('default', function() {

	/* STYLES
	 * 
	 * Watch, SASS processing, postCSS (autoprefixer, rem fallback etc) , etc
	 * 
	 */ 
	gulp.watch('./scss/**/*.scss', ['styles']);

	gulp.watch('./js/scripts.js', ['js-btm']);

	/* IMAGES
	 *
	 *	Do imagemin, but after sprite task
	 *	
	 */ 
	gulp.start('images', ['sprite'] );

	gulp.start('js-top', 'js-btm');



});