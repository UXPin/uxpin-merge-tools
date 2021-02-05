import { buildDesignSystemWithStorybook } from '@uxpin/merge-cli';

module.exports = {
  webpackFinal: async (config, options) => {
    const webpackConfig = {...config};
    // Remove config-internal properties that are filled in by webpack
    // These properties contain in-memory objects
    delete webpackConfig['plugins'];
    delete webpackConfig['resolve']['plugins'];
    delete webpackConfig['resolveLoader']['plugins'];
    delete webpackConfig['optimization']['minimizer'];

    console.log('Building DS for uxpin-merge');
    await buildDesignSystemWithStorybook(webpackConfig);

    return config;
  },
};
