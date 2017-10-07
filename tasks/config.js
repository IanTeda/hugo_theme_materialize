'use strict';

let pngquant = require('imagemin-pngquant');

const hstatic = 'static/';
const nodeModules = 'node_modules/';
const src = 'src/';
const themeName = 'materialize';

module.exports = {
  css: {
    extensions: 'src/styles/**/*.css',
    src: src + 'styles/main.css',
  },
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
            width: 600,
            rename: {
              suffix: '@mobile',
              extname: '.jpg',
            },
            withoutEnlargement: false,
          }, {
            width: 992,
            rename: {
              suffix: '@tablet',
              extname: '.jpg',
            },
            withoutEnlargement: false,
          }, {
            width: 1200,
            rename: {
              suffix: '@desktop',
              extname: '.jpg',
            },
            withoutEnlargement: false,
          }, {
            width: 2880,
            rename: {
              suffix: '@highres',
              extname: '.jpg',
            },
            withoutEnlargement: false,
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
    dest: hstatic,
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
    src: src + 'styles/main.css',
  },
  sass: {
    dest: src + 'styles/',
    filename: 'materialize-custom.css',
    src: src + 'sass/materialize.scss',
  },
  scripts: {
    extensions: 'src/scripts/**/*.js',
    filename: themeName + '.js',
    src: [
      src + 'scripts/jquery.js',
      src + 'scripts/materialize.js',
      src + 'scripts/jquery.matchHeight.js',
      src + 'scripts/main.js',
    ],
    dest: hstatic,
  },
  styles: {
    dest: hstatic + 'styles',
    extensions: [
      'src/sass/**/*.scss',
      'src/styles/**/*.css',
    ],
    filename: themeName + '.css',
  },
  uglify: {
    options: {
    },
  },
};
