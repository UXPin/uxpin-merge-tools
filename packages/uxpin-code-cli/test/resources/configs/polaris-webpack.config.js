const _ = require('lodash');

const config = require('../repos/polaris/playground/webpack.config')

const skipLoader = (config, test, loaderName) => {
  const loaders = _.find(config.module.loaders, (loaders) => loaders.test.toString() === test.toString());
  _.remove(loaders.use, (loader) => loader.loader === loaderName);
  return config;
};

module.exports = skipLoader(config, /\.scss$/, 'style-loader');
