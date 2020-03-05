module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'broken-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
};
