// main.js for storybook DS with @uxpin/merge-storybook-preset-addon
module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.js', '../src/**/*.stories.tsx'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-storysource', '@storybook/addon-a11y', '@uxpin/merge-storybook-preset-addon'],
};
