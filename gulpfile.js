var gulp 	= require('gulp'),
	gfi  	= require('gulp-file-insert'),
	concat  = require('gulp-concat'),
	uglify  = require('gulp-uglify'),
	css     = require('gulp-minify-css'),
	html  	= require('gulp-minify-html'),
	replace = require('gulp-replace'),
	utf8	= require('utf8'),
	key		= 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

// Use this later.
var encode  = function (input) {
	var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    input = utf8.encode(input);

    while (i < input.length) {

        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }

        output = output +
            keyStr.charAt(enc1) + keyStr.charAt(enc2) +
            keyStr.charAt(enc3) + keyStr.charAt(enc4);

    }

    return output;
};


/* [Main] Build */

gulp.task('build', function() {
	gulp.start('css','js','html','compile','load');
});


/* Compile CSS */

gulp.task('css', function() {
	return gulp.src('./css/*.css')
		.pipe(concat('a.min.css'))
		.pipe(css())
		.pipe(gulp.dest('./build/'));
});


/* Compile JS */

gulp.task('js', function() {
	return gulp.src('./js/*.js')
		.pipe(concat('a.min.js'))
		.pipe(uglify({ mangle: false }))
		.pipe(gulp.dest('./build/'));
});


/* Build HTML */

gulp.task('html', ['css','js'], function() {
	return gulp.src('./stub.html')
		.pipe(concat('a.html'))
		.pipe(gfi({
			'{{CSS}}': './build/a.min.css',
			'{{JS}}': './build/a.min.js'
		}))
		.pipe(gulp.dest('./build/'));
});


/* Compile It */

gulp.task('compile', ['css','js','html'], function() {
	return gulp.src('./build/a.html')
		.pipe(html())
		.pipe(replace(/'/g, "\""))
		.pipe(concat('index.html'))
		.pipe(gulp.dest('./'));
});


/* Stage Loader */

gulp.task('load', ['compile'], function() {
	return gulp.src('./loader.js')
		.pipe(concat('load.js'))
		/*.pipe(gfi({
			'{{COMPILED}}': './build/inject'
		}))*/
		.pipe(gulp.dest('./build/'))
});