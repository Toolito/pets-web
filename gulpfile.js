var gulp = require('gulp'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    path = require('path'),
    sourcemaps = require('gulp-sourcemaps'),
    clean = require('gulp-clean'),
    open = require("gulp-open"),
    watch = require('gulp-watch'),
    bowerFiles = require('main-bower-files'),
    inject = require('gulp-inject'),
    angularFilesort = require('gulp-angular-filesort'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');

gulp.task('watch', function () {
    gulp.watch(['app/**/*.js', 'app/modules/**/*.js', '!app/bower_components/**/*.js'], ['injectAngularScripts', 'reloadJs']);
    gulp.watch(['app/**/*.html', '!app/bower_components/**/*.html'], ['reloadHtml']);
    gulp.watch('./bower.json', ['injectAngularScripts', 'reloadBower']);
    gulp.watch(['assets/sass/*.scss', 'app/modules/**/*.sasscsss', 'app/common/directives/**/*.scss'], ['sass']);
});

gulp.task('reloadJs', function () {
    gulp.src(['app/**/*.js', 'app/modules/**/*.js', '!app/bower_components/**/*.js'])
        .pipe(plumber())
        .pipe(connect.reload());
});
gulp.task('reloadHtml', function () {
    gulp.src(['app/**/*.html', '!app/bower_components/**/*.html'])
        .pipe(plumber())
        .pipe(connect.reload());
});

gulp.task('reloadBower', function () {
    gulp.src('./bower.json')
        .pipe(plumber())
        .pipe(connect.reload());
});


gulp.task('injectAngularScripts', function () {

    gulp.src('./index.tpl.html')
        .pipe(rename('index.html'))
        .pipe(inject(
            gulp.src(['./assets/lib/*.js']), {name: 'lib'}
        ))
        .pipe(inject(
            gulp.src(bowerFiles())
                .pipe(order(['**/moment-with-locales.min.js', '**/moment-range.js', '**/angular.js', '**/uri-templates.js', '**/*.js']))
            , {name: 'bower'}))
        .pipe(inject(
            gulp.src(['./tmp/styles/*.css']) // gulp-angular-filesort depends on file contents, so don't use {read: false} here
            , {name: 'injectCss'}
        ))
        .pipe(inject(
            gulp.src(['./app/models/*.js']) // gulp-angular-filesort depends on file contents, so don't use {read: false} here
                .pipe(plumber())
                .pipe(angularFilesort())
            , {name: 'models'}
        ))
        .pipe(inject(
            gulp.src(['./app/modules/**/*.js']) // gulp-angular-filesort depends on file contents, so don't use {read: false} here
                .pipe(plumber())
                .pipe(angularFilesort())
            , {name: 'modules'}
        ))
        .pipe(inject(
            gulp.src('./app/common/**/*.js') // gulp-angular-filesort depends on file contents, so don't use {read: false} here
                .pipe(plumber())
                .pipe(angularFilesort())
            , {name: 'common'}
        ))
        .pipe(inject(
            gulp.src('./app/config/**/*.js') // gulp-angular-filesort depends on file contents, so don't use {read: false} here
                .pipe(plumber())
                .pipe(angularFilesort())
            , {name: 'config'}
        ))
        .pipe(inject(
            gulp.src('./app/*.js') // gulp-angular-filesort depends on file contents, so don't use {read: false} here
                .pipe(plumber())
                .pipe(angularFilesort())
            , {name: 'app'}
        ))
        .pipe(gulp.dest('./'));
});

gulp.task('connect', function () {
    connect.server({
        root: '',
        livereload: true,
        port: 9100,
        middleware: function (connect, opt) {
            var middlewares = [];
            var base = [
                '.tmp',
                './app',
                './assets'
            ];
            middlewares.push(require('connect-modrewrite')(['^[^\\.]*$ /index.html [L]'])); //Matches everything that does not contain a '.' (period)
            base.forEach(function (base) {
                middlewares.push(connect.static(base));
            });
            return middlewares;
        }
    });
});

gulp.task('url', function () {

    var os = require('os');

    if (os.platform() === 'darwin') {
        var options = {
            url: 'http://localhost:9100',
            app: 'Google Chrome'
        };
    } else {
        var options = {
            url: 'http://localhost:9100',
            app: 'chrome'
        };
    }


    gulp.src('./index.html')
        .pipe(open('', options));
});

gulp.task('cleanCss', function () {
    return gulp.src('./app/styles/app.css', {read: false})
        .pipe(clean());
});

gulp.task('renameCss', function () {
    gulp.src("./app/styles/app.css")
        .pipe(rename("main.css"))
        .pipe(gulp.dest('./app/styles'));
});

gulp.task('sassmaps', function () {
    gulp.src('./app/sass/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('dist'));
});

gulp.task('sass', function () {
    gulp.src('./assets/sass/app.scss')
        .pipe(plumber())
        .pipe(sass({
            paths: [path.join(__dirname, 'sass', 'includes')],
            includePaths: ['app/bower_components/bourbon/app/assets/stylesheets/', 'app/bower_components/mdi/scss/']
        }))
        .pipe(gulp.dest('./tmp/styles'))
        .pipe(connect.reload());
});

gulp.task('copyFonts', function() {
    gulp.src('./assets/fonts/*')
        .pipe(gulp.dest('./tmp/fonts'))
});

gulp.task('serve', ['sass', 'injectAngularScripts', 'connect', 'url', 'watch', 'copyFonts'], function () {
});


var del = require('del'),
    minifyHTML = require('gulp-minify-html'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    order = require('gulp-order'),
    minifyCSS = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    autoprefixer = require('gulp-autoprefixer');

var paths = {
    html: ['./app/**/*.html', '!./app/bower_components/**'],
    scripts: ['./app/**/*.js', '!./app/bower_components/**'],
    images: ['./assets/images/**/*'],
    videos: ['./assets/videos/**/*'],
    lib: ['./assets/lib/**/*'],
    zeroclipboard: ['./app/bower_components/zeroclipboard/dist/*.swf'],
    fonts: ['./assets/fonts/*', './app/bower_components/mdi/fonts/*']
};


function appFonts(done) {

    gulp
        .src(paths.fonts)
        .pipe(gulp.dest('dist/fonts'))
        .on('end', function () {
            done(null);
        });

}


/**
 *
 */
function appScripts(done) {

    gulp
        .src(paths.scripts)
        .pipe(order(['**/common.config.js', '**/*.js', '**/app.js']))
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist/scripts'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('dist/scripts'))
        .on('end', function () {
            done(null);
        });
}


/**
 *
 */
function vendorScripts(done) {
    gulp
        .src(bowerFiles({filter: '**/*.js'}))
        .pipe(order(['**/moment-with-locales.min.js', '**/moment-range.js', '**/angular.js', '**/uri-templates.js', '**/*.js']))
        .pipe(sourcemaps.init())
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('dist/scripts'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('dist/scripts'))
        .on('end', function () {
            done(null);
        });
}

function libScripts(done) {
    gulp.src(paths.lib)
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/lib'))
        .on('end', function () {
            done(null);
        });
}


/**
 *
 */
function appStyles(done) {
    gulp
        .src('./tmp/styles/*.css')
        .pipe(gulp.dest('dist/styles'))
        .pipe(rename({suffix: '.min'}))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/styles'))
        .on('end', function () {
            done(null);
        });
}


/**
 *
 */
function vendorStyles(done) {
    gulp
        .src(bowerFiles({filter: '**/*.css'}))
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest('dist/styles'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/styles'))
        .on('end', function () {
            done(null);
        });
}


/**
 *
 */
function index(done) {
    gulp
        .src('./index.tpl.html')
        .pipe(rename('index.html'))
        .pipe(
            inject(
                gulp.src('scripts/*.min.js',
                    {cwd: './dist', read: false}
                    )
                    .pipe(
                        order(['**/vendor.min.js', '**/*.min.js'])),
                {name: 'bower'}
            )
        )
        .pipe(inject(gulp.src('lib/*.min.js', {
            cwd: './dist',
            read: false
        }).pipe(order(['**/lib.min.js', '**/*.min.js'])), {name: 'lib'}))
        .pipe(inject(gulp.src('styles/*.min.css', {
            cwd: './dist',
            read: false
        }).pipe(order(['**/vendor.min.css', '**/*.min.css'])), {name: 'injectCss'}))
        .pipe(minifyHTML({comments: false, quotes: true}))
        .pipe(gulp.dest('./dist'))
        .on('end', function () {
            done(null);
        });
}


/**
 * Manage HTML files
 */
function html(done) {
    gulp
        .src(paths.html)
        .pipe(minifyHTML({comments: false, quotes: true}))
        .pipe(gulp.dest('./dist'))
        .on('end', function () {
            done(null);
        });
}


function images(done) {
    gulp
        .src(paths.images)
        .pipe(imagemin({optimizationLevel: 3, progressive: true, interlaced: true}))
        .pipe(gulp.dest('dist/images'))
        .on('end', function () {
            done(null);
        });
}

function videos(done) {
    gulp
        .src(paths.videos)
        .pipe(gulp.dest('dist/videos'))
        .on('end', function() {
            done(null);
	});
}

function zeroclipboard(done) {
    gulp
        .src(paths.zeroclipboard)
        .pipe(gulp.dest('dist/assets'))
        .on('end', function () {
            done(null);
        })
}


/**
 * Clean the dist folder
 */
gulp.task('clean', function (cb) {
    del(['dist'], cb);
});


gulp.task('server', function () {
    connect.server({
        root: '',
        livereload: true,
        port: 9000,
        middleware: function (connect, opt) {
            var middlewares = [];
            var base = [
                './cdn',
            ];
            middlewares.push(require('connect-modrewrite')(['^[^\\.]*$ /index.html [L]'])); //Matches everything that does not contain a '.' (period)
            base.forEach(function (base) {
                middlewares.push(connect.static(base));
            });
            return middlewares;
        }
    });
});


var async = require('async');

/**
 * Build the app
 */
gulp.task('build', ['clean', 'sass'], function (done) {
    async.series([
        appFonts,
        appScripts,
        vendorScripts,
        libScripts,
        appStyles,
        vendorStyles,
        html,
        images,
        videos,
        zeroclipboard,
        index
    ]);
});
