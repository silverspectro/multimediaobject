var path = require("path"),
    autoprefixer = require("autoprefixer"),
    webpack = require('webpack'),
    CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

module.exports = {
  entry:"./src/MultimediaObject.js",
  module: {
    loaders: [{
      test: /\.scss$/,
      loaders: ["style", "css", "sass", "postcss"] //requires npm install css-loader style-loader sass-loader node-sass
    },
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: "babel",
      query: {
        presets: ["es2015"]
      }
    },
    {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: [
          'file?hash=sha512&digest=hex&name=images/[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
      ]
    },
    {
      test:   /\.html/,
      loader: 'html',
    }
  ]},
  postcss : function() {
    return [require('autoprefixer')];
  },
  output: {
    path: "build",
    filename: "MultimediaObject.build.js",
    publicPath: 'build/',
  },
  sassLoader: {
    includePaths: [path.resolve(__dirname, "./src/style")]
  },
  imagemin: {
    gifsicle: { interlaced: false },
    jpegtran: {
      progressive: true,
      arithmetic: false
    },
    optipng: { optimizationLevel: 5 },
    pngquant: {
      floyd: 0.5,
      speed: 2
    },
    svgo: {
      plugins: [
        { removeTitle: true },
        { convertPathData: false }
      ]
    }
  }
};
