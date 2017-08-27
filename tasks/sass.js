/**
 * Gulp Task for Sass Files
 * @param {gulp} gulp - The gulp module passed in
 * @param {config} config - The projects Gulp config file
 * @param {argv} argv - Arguments flagged at the CLI
 * @param {$} $ - Lazy load plugins, save the imports at the start of the file
 * @return {stream} Stream - Task stream to manage JavaScript in project
 */

module.exports = (gulp, config, argv, $) => {
    'use strict';
    return function() {
      let stream = gulp
        // Sass source files.
        .src(config.sass.src)

        // Compile to css
        .pipe($.sass().on('error', $.sass.logError))

        // Rename dest pipe output
        .pipe($.rename(config.sass.filename))

        // Write stream to destination folder
        .pipe(gulp.dest(config.sass.dest));

      return stream;
    };
  };
