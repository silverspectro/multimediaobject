const baseConf = require('./webpack.config');

// Base source paths
const PATHS = require('./paths');

const devConf = Object.assign(baseConf, {
  mode: 'development',
  target: 'node',
  plugins: [],
  output: {
    filename: 'MultimediaObject.js',
    path: PATHS.TESTS,
  }
})

module.exports = devConf;