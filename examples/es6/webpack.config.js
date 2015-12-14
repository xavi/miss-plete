var path = require("path");

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'dist/bundle.js'
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        include: /miss-plete/,
        loader: 'source-map'
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
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
