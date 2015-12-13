var webpack = require("webpack");
var path = require('path');

module.exports = {
  entry: ['babel-polyfill', path.join(__dirname, 'main.js')],
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel?presets[]=es2015'
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compressor: { warnings: false }
    })
  ],
  devtool: 'source-map'
};
