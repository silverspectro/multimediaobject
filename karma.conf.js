const buble = require('rollup-plugin-buble');
// Karma configuration
// Generated on Tue Jan 17 2017 19:19:58 GMT+0100 (Romance Standard Time)
const dirname = './';

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: dirname,


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'build/MultimediaObject.js',
      'src/utils/utils.js',
      'test/utils/*.test.js',
      'test/lib/*.test.js',
      'test/MultimediaObject/*.test.js',
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    // optionally, configure the reporter
    coverageReporter: {
      reporters: [
        {
          type: 'text-summary',
        },
        {
          type: 'html',
          dir: 'coverage/',
        },
      ],
    },
    preprocessors: {
      'build/MultimediaObject.js': ['coverage'],
      'src/utils/utils.js': ['rollup', 'coverage'],
      'test/lib/*.test.js': ['rollup', 'coverage'],
      'test/MultimediaObject/*.test.js': ['rollup'],
      'test/utils/*.test.js': ['rollup'],
    },

    rollupPreprocessor: {
      plugins: [
        buble(),
      ],
      format: 'iife',               // helps prevent naming collisions
      moduleName: 'window',         // required for 'iife' format
      sourceMap: 'inline',          // sensible for testing
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec', 'coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome', 'PhantomJS', 'Firefox', 'IE'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
  });
};