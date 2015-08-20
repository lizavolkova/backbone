// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();

// Lint Task
gulp.task('lint', function() {
    return gulp.src(['app/js/*.js','app/js/modules/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('app/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        // .pipe(gulp.dest('css'));
        .pipe(gulp.dest('dist'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src([
    		'app/js/vendor/jquery.js', 
    		'app/js/vendor/underscore-min.js', 
    		'app/js/vendor/backbone-min.js', 
    		'app/js/vendor/foundation.min.js', 
    		'app/js/vendor/modernizr.js', 
    		'app/js/modules/**/*.js', 
    		'app/js/*.js'
    	])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

//index.html file
gulp.task('index', function() {
	return gulp.src('app/index.html')
		.pipe(gulp.dest('dist'));
});

//Browsersync
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(['app/js/*.js','app/js/modules/**/*.js'], ['lint', 'scripts']);
    gulp.watch(['app/*.scss','app/js/modules/**/*.scss'], ['sass']);
    gulp.watch('app/index.html', ['index']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'index', 'watch', 'browser-sync']);