const { buildDesignSystemWithStorybook } = require('@uxpin/merge-cli');
const { cloneDeep } = require('lodash');

module.exports = {
  webpackFinal: async (config, option) => {

    let webpackConfigForMerge = cloneDeep(config);;

    option.presetsList.forEach(async (preset) => {
      if (!preset.preset.webpackFinal || preset.name.includes('uxpin-merge-storybook-preset-addon')) {
        return;
      } else {
        webpackConfigForMerge = await require(preset.name).webpackFinal(webpackConfigForMerge, option);
      }
    });

    console.log('Building a design system for uxpin-merge')
    await buildDesignSystemWithStorybook(webpackConfigForMerge);

    return config;
  },
};
