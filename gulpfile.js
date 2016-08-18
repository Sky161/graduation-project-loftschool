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

var tplPath = './';

gulp.task('scripts', function() {

	gulp.src(tplPath + 'scripts/main.js')
		.pipe(browserify({
			shim: require("./browserify-shim.json")
		}))
		.pipe(plumber())
		.pipe(rename("build.js"))
		.pipe(gulp.dest(tplPath +'/app/'))
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

gulp.task('watch', ['jade', 'sass', 'scripts', 'server'], function () {
	watch(tplPath + '/scripts/**/*.js', function(){
		gulp.start("scripts");
		browserSync.reload();
	});
	watch(tplPath + '/jade/**/*.jade', function(){
		gulp.start("jade");
		browserSync.reload();
	});
	watch(tplPath + '/sass/**/*.sass', function(){
		gulp.start("sass");
		browserSync.reload();
	});
});

gulp.task('default', ['jade', 'sass', 'scripts']);
