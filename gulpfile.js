'use strict';
var gulp = require('gulp');
var browserify = require('gulp-browserify');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var watch = require('gulp-watch');
var jade = require('gulp-jade');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');

var tplPath = './';

gulp.task('scripts', function() {

	gulp.src(tplPath + 'scripts/main.js')
		.pipe(plumber())
		.pipe(browserify())
		.pipe(rename("build.js"))
		.pipe(gulp.dest(tplPath +'/app/'))
		.pipe(browserSync.stream());
});

gulp.task('build-tests', function() {

	gulp.src(tplPath + 'scripts/tests/main.js')
		.pipe(plumber())
		.pipe(browserify())
		.pipe(rename("tests.build.js"))
		.pipe(gulp.dest(tplPath +'/app/'))
		.pipe(browserSync.stream());
});

gulp.task('jade', function () {
	gulp.src(tplPath + '/jade/*.jade')
		.pipe(plumber())
		.pipe(jade({pretty: true}))
		.pipe(gulp.dest(tplPath + './app/'))
		.pipe(browserSync.stream());
});

gulp.task('sass', function () {
	gulp.src(tplPath + '/sass/**/*.sass')
		.pipe(plumber())
		.pipe(sass().on('error', sass.logError))
		.pipe(rename('build.css'))
		.pipe(autoprefixer('last 10 versions', '> 1%', 'ie 9'))
		.pipe(gulp.dest(tplPath + '/app/'))
		.pipe(browserSync.stream());
});

gulp.task('server', function(){
	browserSync.init({
		server: {
			baseDir: "./app"
		}
	});
});

gulp.task('watch', ['jade', 'sass', 'scripts', 'build-tests', 'server'], function () {
	watch([tplPath + '/scripts/**/*.js', !tplPath + '/scripts/tests/**/*.js'], function(){
		gulp.start("scripts");
	});

	watch(tplPath + '/scripts/tests/**/*.js', function(){
		gulp.start("build-tests");
	});

	watch(tplPath + '/jade/**/*.jade', function(){
		gulp.start("jade");
	});

	watch(tplPath + '/sass/**/*.sass', function(){
		gulp.start("sass");
	});
});

gulp.task('default', ['jade', 'sass', 'scripts']);

gulp.task('compress-js', function () {
	setTimeout(function() {
		gulp.src(tplPath + 'app/build.js')
			.pipe(babel({
				presets: ['es2015']
			}))
			.pipe(uglify())
			.pipe(gulp.dest(tplPath + '/app/'));
	}, 500);
});

gulp.task('prod', ['default', 'compress-js']);
