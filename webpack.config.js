var webpack = require("webpack");

module.exports = {
  entry: ['babel-polyfill', './main.js'],
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel?presets[]=es2015'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ],
  stats: {
    colors: true
  },
  devtool: 'source-map',
};
