const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  mode: "development",
  // To get a customized banner in the bundle,
  // comments should not be extracted by TerserPlugin that comes with Webpack 5, see:
  // https://stackoverflow.com/questions/69444934/webpack-bannerplugin-creates-separate-license-file
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: '__MY_CUSTOM_BANNER_ADDED_BY_WEBPACK_'
    }),
  ],
};
