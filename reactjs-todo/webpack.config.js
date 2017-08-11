var copyWebpackPlugin = require('copy-webpack-plugin');
var path              = require('path');

var DIST_DIR = path.resolve(__dirname, 'dist');
var SRC_DIR  = path.resolve(__dirname, 'src');

var config = {
  entry: SRC_DIR + '/app/index.js',
  output: {
    path: DIST_DIR,
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new copyWebpackPlugin([
      { from: SRC_DIR + '/index.html' }
    ])
  ],
  module: {
    loaders: [
      {
        test: /\.js?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-2']
        }
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
};

module.exports = config;