/**
 * Gulp Task for JavaScript Files
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
      // JavaScript source files. Order of important and set in config.
      .src(config.scripts.src)

      .pipe($.babel({presets: ['es2015']}))

      // Use source maps for debugging
      .pipe($.sourcemaps.init())

      // Concatenate source files.
      .pipe($.concat(config.scripts.filename))
      .pipe($.size({title: 'Scripts concatenated into one file:'}))

      // Remove white space
      .pipe($.uglify().on('error', function(e) {
        console.log(e);
      }))

      // Rename to 'min' since we have minified
      .pipe($.rename({suffix: '.min'}))

      // Add hash to concatenated script file
      .pipe($.hash())
      .on('end', function() {
        $.util.log('Hash added to concatenated script');
      })

      // Write source maps for easier debugging
      .pipe($.sourcemaps.write('.'))
      .pipe($.size({title: 'Source maps written:'}))

      // Write stream to destination folder
      .pipe(gulp.dest(config.scripts.dest))

      // Create hash map of script
      .pipe($.hash.manifest('hash.json'))
      .pipe(gulp.dest('data'))
      .on('end', function() {
        $.util.log('Script hashes added to hash.json in /data folder');
      });

    return stream;
  };
};
