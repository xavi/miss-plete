var path = require("path");

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'dist/bundle.js'
  },
  module: {
    // Uses source-map-loader to merge miss-plete's source map for ES6 code
    // with the source map emitted here by the devtool configuration below
    // http://webpack.github.io/docs/configuration.html#devtool
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
