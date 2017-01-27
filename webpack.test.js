const path = require('path');
const autoprefixer = require('autoprefixer');

module.exports = {
  module: {
    loaders: [{
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass', 'postcss'], // requires npm install css-loader style-loader sass-loader node-sass
    },
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
      query: {
        presets: ['es2015'],
        plugins: [
          'external-helpers',
          'add-module-exports',
          'transform-runtime',
        ],
      },
    },
    {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: [
        'file?hash=sha512&digest=hex&name=images/[hash].[ext]',
        'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false',
      ],
    },
    {
      test: /\.html/,
      loader: 'html',
    },
    ] },
  postcss() {
    return [autoprefixer];
  },
  sassLoader: {
    includePaths: [path.resolve(__dirname, './src/style')],
  },
  imagemin: {
    gifsicle: { interlaced: false },
    jpegtran: {
      progressive: true,
      arithmetic: false,
    },
    optipng: { optimizationLevel: 5 },
    pngquant: {
      floyd: 0.5,
      speed: 2,
    },
    svgo: {
      plugins: [
        { removeTitle: true },
        { convertPathData: false },
      ],
    },
  },
  output: {
    sourceMapFilename: '[file].map',
  },
  debug: true,
  cache: true,
  devtool: 'inline-source-map',
};
