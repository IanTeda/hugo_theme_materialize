'use strict';

let pngquant = require('imagemin-pngquant');

const hstatic = 'static/';
const nodeModules = 'node_modules/';
const src = 'src/';
const themeName = 'ianteda2017';

module.exports = {
  fonts: {
    extensions: '*.{eot,svg,ttf,woff,woff2,otf}',
    src: [
      nodeModules + 'font-awesome/fonts/**/*.{eot,svg,ttf,woff,woff2,otf}',
      src + 'fonts/**/*.{eot,svg,ttf,woff,woff2,otf}',
    ],
    dest: hstatic + 'fonts',
  },
  gulpLoadPlugins: {
    options: {
      // when set to true, the plugin will log info to console
      DEBUG: false,

      // the glob(s) to search for in package.json
      pattern: ['gulp-*', 'gulp.*', 'del', 'merge2', 'shelljs'],

      // if true, transforms hyphenated plugins names to camel case
      camelize: true,

      // whether the plugins should be lazy loaded on demand
      lazy: true,
    },
  },
  gzip: {
    options: {
      append: true,
    },
  },
  images: {
    extensions: src + 'images/**/*.{png,gif,jpg}',
    src: src + 'images/**/*.{png,gif,jpg}',
    dest: hstatic + 'images',
    responsive: {
      config: {
        '*': [
          {
            width: 576,
            rename: {suffix: '@mobile'},
            withoutEnlargement: true,
          }, {
            width: 768,
            rename: {suffix: '@tablet'},
            withoutEnlargement: true,
          }, {
            width: 992,
            rename: {suffix: '@desktop'},
            withoutEnlargement: true,
          }, {
            width: 1200,
            rename: {suffix: '@highres'},
            withoutEnlargement: true,
          },
        ],
      },
      global: {
        // Global configuration for all images
        // The output quality for JPEG, WebP and TIFF output formats
        quality: 70,
        // Use progressive (interlace) scan for JPEG and PNG output
        progressive: true,
        // Zlib compression level of PNG output format
        compressionLevel: 6,
        // Strip all metadata
        withMetadata: false,
        // Skip files that need enlargement
        errorOnEnlargement: false,
        // Don't spam the console
        silent: true,
      },
    },
  },
  imagemin: {
    options: {
      progressive: true,
      interlaced: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()],
    },
  },
  postcss: {
    dest: hstatic + 'styles',
    extensions: 'src/styles/**/*.css',
    filename: themeName + '.css',
    processors: [
      require('postcss-import'),
      require('postcss-nested'),
      require('postcss-mixins'),
      require('postcss-simple-vars'),
      require('lost'),
      require('css-mqpacker'),
      require('postcss-sprites'),
      require('postcss-responsive-type'),
      require('postcss-font-magician'),
      require('autoprefixer'),
      require('cssnano'),
    ],
    src: [
      src + 'styles/main.css',
    ],
  },
  sass: {
    extensions: 'src/sass/**/*.scss',
    filename: 'sass.css',
    src: [
      src + 'sass/main.scss',
    ],
    dest: src + 'styles/',
  },
  scripts: {
    extensions: 'src/scripts/**/*.js',
    filename: themeName + '.js',
    src: [
      nodeModules + 'jquery/dist/jquery.js',
      src + 'scripts/materialize.js',
      src + 'scripts/main.js',
    ],
    dest: hstatic + 'scripts',
  },
  uglify: {
    options: {
    },
  },
};
