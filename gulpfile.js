const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const folderDelete = require('folder-delete');
const runSequence = require('run-sequence');
const gulpPaths = require('./gulpPaths');

const args = process.argv;

gulp.task('clean', () => {
  folderDelete('build/server', { debugLog: true });
});

gulp.task('server:js', () =>
  gulp
    .src(gulpPaths.path.serverJsSRC)
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.babel())
    .on('error', plugins.util.log.bind(plugins.util))
    .pipe(plugins.sourcemaps.write('.'))
    .pipe(gulp.dest(gulpPaths.path.serverJsBUILD)));

gulp.task('server:js:PROD', () =>
  gulp
    .src(gulpPaths.path.serverJsSRC)
    .pipe(plugins.babel())
    .on('error', plugins.util.log.bind(plugins.util))
    .pipe(gulp.dest(gulpPaths.path.serverJsBUILD)));

gulp.task('server:develop', () => {
  plugins.developServer.listen({
    path: './index.js',
    cwd: './build/server',
    args,
  });

  gulp.watch(['build/server/**/*.js'], ['server:restart']);
});

gulp.task('server:restart', () => {
  plugins.developServer.restart();
});

gulp.task('watch', () => {
  gulp.watch(gulpPaths.path.serverJsSRC, ['server:js']);
});

gulp.task('serve:development', (done) => {
  runSequence('clean', ['server:js'], ['server:develop', 'watch'], done);
});

gulp.task('build:production', (done) => {
  runSequence('clean', ['server:js:PROD'], done);
});
