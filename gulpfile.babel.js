'use strict';

// Import Gulp module
import gulp from 'gulp';
// Command line (CLI) argument
var argv = require('./tasks/yargs');
// Configuration file for gulp tasks
const config = require('./tasks/config');
// Lazy load plugins, save on var declaration
var plugins = require('gulp-load-plugins')(config.gulpLoadPlugins.options);
// BrowserSync is used to live-reload your website
var browserSync = require('browser-sync').create();

/**
 * Require Gulp Task
 * @param {task} task - What Gulp task do you require
 * @return {function} function - Returns task from module export
 */
function requireTask(task) {
  // Require Gulp task module, passing in Gulp, config, argv and plugin objects
  return require('./tasks/' + task + '.js')(
    gulp,
    config,
    argv,
    plugins
  );
}

/**
 * Require Gulp Clean Task
 * @param {directory} directory - What directory do you want cleaned
 * @return {function} function  - Returns task function from moudle export
 */
function requireCleanTask(directory) {
  // Require gulp task module
  return require('./tasks/clean')(
    directory,
    plugins
  );
}


/**
 * FONT TASKS
 * Usage: gulp fonts:clean - Clean main.css from postcss build folder
 * Usage: gulp fonts:build - Build main.css from source into build folder
 * Usage: gulp fonts       - Clean build folder, then build from source into build folder
*/
gulp.task(
  'fonts:clean',
  requireCleanTask(
    config.fonts.dest + '/**/*.{eot,svg,ttf,woff,woff2,otf}'
  )
);
gulp.task(
  'fonts:build',
  requireTask(
    'fonts'
  )
);
gulp.task(
  'fonts',
  gulp.series(
    'fonts:clean',
    'fonts:build'
  )
);


/**
 * IMAGE TASKS
 * Usage: gulp images:clean - Clean images from build folder
 * Usage: gulp images:build - Copy and minify images to build folder
 * Usage: gulp images       - Clean build folder, then minify and copy images to build folder
*/
gulp.task(
  'images:clean',
  requireCleanTask(
    config.images.dest + '/**/*.{png,gif,jpg}'
  )
);
gulp.task(
  'images:build',
  requireTask(
    'images'
  )
);
gulp.task(
  'images',
  gulp.series(
    'images:clean',
    'images:build'
  )
);

/**
 * POSTCSS TASKS
 * Usage: gulp postcss:clean - Clean main.css from postcss build folder
 * Usage: gulp postcss:build - Build main.css from source into build folder
 * Usage: gulp postcss       - Clean build folder, then build from source into build folder
*/
gulp.task(
  'postcss:clean',
  requireCleanTask(
    config.postcss.dest + '/**/*'
  )
);
gulp.task(
  'postcss:build',
  requireTask(
    'postcss'
  )
);
gulp.task(
  'postcss',
  gulp.series(
    'postcss:clean',
    'postcss:build'
  )
);

/**
 * SASS TASKS
 * Usage: gulp sass:clean  - Clean main.js from the JavaScripts build folder
 * Usage: gulp sass:build  - Build main.js from source into build folder
 * Usage: gulp sass        - Clean build folder, then build from source into build folder
*/
gulp.task(
  'sass:clean',
  requireCleanTask(
    config.sass.dest + config.sass.filename
  )
);
gulp.task(
  'sass:build',
  requireTask(
    'sass'
  )
);
gulp.task(
  'sass',
  gulp.series(
    'sass:clean',
    'sass:build'
  )
);

/**
 * SCRIPT TASKS
 * Usage: gulp scripts:clean  - Clean main.js from the JavaScripts build folder
 * Usage: gulp scripts:build  - Build main.js from source into build folder
 * Usage: gulp scripts        - Clean build folder, then build from source into build folder
*/
gulp.task(
  'scripts:clean',
  requireCleanTask(
    config.scripts.dest + '/**/*'
  )
);
gulp.task(
  'scripts:build',
  requireTask(
    'scripts'
  )
);
gulp.task(
  'scripts',
  gulp.series(
    'scripts:clean',
    'scripts:build'
  )
);


/**
 * WATCH TASKS
 * Usage: gulp watch:fonts    - Watch for font changes, then clean and build.
 * Usage: gulp watch:images   - Watch for images changes, then clean and build.
 * Usage: gulp watch:scripts  - Watch for script changes, then clean and build.
 * Usage: gulp watch:postcss   - Watch for style changes, then clean and build.
 * Usage: gulp watch          - Watch all for changes
*/

// Watch for font changes
gulp.task('watch:fonts', () => {
  gulp.watch(config.fonts.extensions,  gulp.series('fonts'));
});

// Watch for image changes
gulp.task('watch:images', () => {
  gulp.watch(config.images.extensions, gulp.series('images'));
});

// Watch for sass changes
gulp.task('watch:sass', () => {
  gulp.watch(config.sass.extensions, gulp.series('sass:build'));
});

// Watch for script changes
gulp.task('watch:scripts', () => {
  gulp.watch(config.scripts.extensions, gulp.series('scripts'));
});

// Watch for script changes
gulp.task('watch:postcss', () => {
  gulp.watch(config.postcss.extensions, gulp.series('postcss'));
});

gulp.task('watch', gulp.parallel('watch:fonts', 'watch:images', 'watch:sass', 'watch:scripts', 'watch:postcss'));

/**
 * MAIN TASKS
 */

gulp.task('build', gulp.parallel('fonts', 'images', 'sass', 'scripts', 'postcss'));

gulp.task('hugo', requireTask('hugo'));

gulp.task('development', gulp.series('build', 'watch'));

gulp.task('default', gulp.parallel('development'));
