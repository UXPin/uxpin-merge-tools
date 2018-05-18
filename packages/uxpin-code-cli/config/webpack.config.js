const { resolve } = require('path');

module.exports = {
  mode: 'development',
  entry: './src/debug/server/frontEnd/App.js',
  output: {
    path: resolve(__dirname, '../dist/debug/server'),
    filename: 'index.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  devtool: 'source-map'
};
