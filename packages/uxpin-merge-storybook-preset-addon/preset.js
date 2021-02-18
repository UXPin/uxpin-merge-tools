const { buildDesignSystemWithStorybook } = require('@uxpin/merge-cli');
const { cloneDeep } = require('lodash');
const { logger } = require('@storybook/node-logger');

module.exports = {
  webpackFinal: async (config, option) => {
    // Do nothing if BUILD_SB_WITH_UXPIN_MERGE is not set
    // to avoid slowing storybook build.
    if (!process.env.BUILD_STORYBOOK_WITH_UXPIN_MERGE) {
      logger.trace("BUILD_STORYBOOK_WITH_UXPIN_MERGE is not set. Skipping to build DS for uxpin-merge");
      return config;
    }

    let webpackConfigForMerge = cloneDeep(config);;

    option.presetsList.forEach(async (preset) => {
      if (!preset.preset.webpackFinal || preset.name.includes('uxpin-merge-storybook-preset-addon')) {
        return;
      }

      webpackConfigForMerge = await require(preset.name).webpackFinal(webpackConfigForMerge, option);
    });

    await buildDesignSystemWithStorybook(webpackConfigForMerge);
    // Exit storybook build to avoid slowing @uxpin/merge-cli build
    process.exit(0)
  },
};
