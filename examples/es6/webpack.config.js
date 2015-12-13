var path = require("path");

module.exports = {
  entry: './main.js',
  output: {
    filename: 'dist/bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: { presets: ['es2015'] }
      }
    ]
  },
  resolveLoader: {
    root: path.join(__dirname, "node_modules"),
  },
  devtool: 'source-map'
};
