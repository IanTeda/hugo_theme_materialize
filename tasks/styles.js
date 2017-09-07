/**
 * Gulp Task for JavaScript Files
 * @param {gulp} gulp - The gulp module passed in
 * @param {config} config - The projects Gulp config file
 * @param {argv} argv - Arguments flagged at the CLI
 * @param {$} $ - Lazy load plugins, save the imports at the start of the file
 * @return {stream} Stream - Task stream to manage Style Sheets in project
 */

module.exports = (gulp, config, argv, $) => {
  'use strict';
  return function() {
    let stream = $.merge2(
      gulp.src(config.sass.src)
        .pipe($.sourcemaps.init())
        .pipe($.sass()
        .on('error', $.sass.logError)
      ),
      gulp.src(config.css.src)
        .pipe($.sourcemaps.init())
    )
    // Concatenate css, since order is important
    .pipe($.concat(config.styles.filename))
    .pipe($.size({title: 'Style concatenated into one file:'}))

    // .pipe($.stylelint({
    //   reporters: [
    //     {formatter: 'string', console: true},
    //   ],
    // }))

    // Apply PostCSS processors to the stream
    .pipe($.postcss(config.postcss.processors))
    .pipe($.size({title: 'postCSS:'}))

    // Rename to 'min' since we have minification
    .pipe($.rename({suffix: '.min'}))

    // Add hash to concatenated script file
    .pipe($.hash())
    .on('end', function() {
      $.util.log('Hash added to concatenated styles');
    })

    // Write source maps for easier debugging
    .pipe($.sourcemaps.write('.'))
    .pipe($.size({title: 'Source maps written:'}))

    // Write stream to drive
    .pipe(gulp.dest(config.styles.dest))

    // Create hash map of script
    .pipe($.hash.manifest('hash.json'))
    .pipe(gulp.dest('data'))
    .on('end', function() {
      $.util.log(
        'Style hashes added to hash.json in /data folder'
      );
    });

    return stream;
  };
};
