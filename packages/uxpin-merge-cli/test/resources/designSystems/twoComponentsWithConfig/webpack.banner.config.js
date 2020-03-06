const webpack = require('webpack');

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: '__MY_CUSTOM_BANNER_ADDED_BY_WEBPACK_'
    }),
  ],
};
