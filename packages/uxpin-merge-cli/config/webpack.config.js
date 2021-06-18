const { resolve } = require('path');

module.exports = {
  mode: 'development',
  entry: './src/framework/reactjs/debug/App.js',
  output: {
    path: resolve(__dirname, '../dist/debug/server-reactjs'),
    filename: 'index.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  devtool: 'source-map'
};
