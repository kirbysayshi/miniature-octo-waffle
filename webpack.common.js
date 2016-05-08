var path = require('path');

var plugins = [];

module.exports = {
  entry: {
    client: [
      __dirname + '/src/index.js'
    ]
  },

  output: {
    path: __dirname,
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /(node_modules)/,
        include: __dirname
      }
    ]
  },

  plugins: plugins
}