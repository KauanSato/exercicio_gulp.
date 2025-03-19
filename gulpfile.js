const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');

const paths = {
    sass: './source/sass/**/*.scss',
    images: './source/images/**/*',
    js: './source/scripts/**/*.js',
    dist: {
        css: './build/css',
        images: './build/images',
        js: './build/js',
    },
};

function compileSass() {
    return gulp
        .src(paths.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(gulp.dest(paths.dist.css));
}

function compressImages() {
    return gulp
        .src(paths.images)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.dist.images));
}

function compressJs() {
    return gulp
        .src(paths.js)
        .pipe(uglify())
        .pipe(gulp.dest(paths.dist.js));
}

gulp.task('sass', compileSass);
gulp.task('images', compressImages);
gulp.task('js', compressJs);
gulp.task('default', gulp.series('sass', 'images', 'js'));
