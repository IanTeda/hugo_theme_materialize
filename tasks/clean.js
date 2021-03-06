/**
 * Gulp Clean Task
 * @module clean.task.js
 * @param {directory} directory - What directory are we going to clean
 * @param {$} $ - Lazy load plugins, save the imports at the start of the file
 * @return {task} Clean - Clean directory passed in
 */
module.exports = (directory, $) => {
  'use strict';
  return function() {
    // Use globbing pattern to match everything inside the folder
    let stream = $.del(directory);
    return stream;
  };
};
