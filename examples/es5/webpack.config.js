var path = require("path");

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'dist/bundle.js'
  },
  module: {
    // Makes available miss-plete's source maps for ES6 code
    // http://stackoverflow.com/q/32702478
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'source-map',
        include: /miss-plete/
      }
    ]
  },
  resolveLoader: {
    root: path.join(__dirname, "node_modules"),
  },
  devtool: 'source-map'
};
