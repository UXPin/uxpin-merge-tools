# UXPin Merge Storybook Add-on

This addon is used to enable [Storybook v6+](https://storybook.js.org/docs) support for [UXPin Merge](https://www.uxpin.com/docs/merge).


## Instructions

### 1. Set up Storybook in your Design System repository

Given a repository that contains components that you'd like to use across your organization, ensure that it has [Storybook v6 installed](https://storybook.js.org/docs/react/get-started/install) and functional. The install steps normally consist of:

```shell
$ yarn add -D storybook
$ npx sb init
```

As you [write stories for your components](https://storybook.js.org/docs/react/get-started/whats-a-story), ensure the following requirements must be met:

- Component stories' file names should be of the form `<component name>.stories.[js|ts]`.
- `storiesOf` (Storybook v5 and below) should not be used ([CSF should be used instead](https://storybook.js.org/docs/react/api/csf)), and the `component` key should be present

### 2. Install UXPin Merge in your Design System repository

If UXPin Merge is not already installed and set up in your storybook enabled repository, install it and [integrate your components integrated](https://www.uxpin.com/docs/merge/integrating-your-own-components#requirements).

### 3. Add this Preset Addon to your Storybook configuration file

To enable Storybook and Merge CLI to interact, we must [install a preset addon (this repository)](https://storybook.js.org/docs/react/addons/install-addons):

```shell
$ yarn add -D @uxpin/merge-storybook-preset-addon
```

After installing the addon as a requirement, edit your Storybook configuration file (normally named `.storybook/main.js`)

```js
module.exports = {
  stories: [],
  addons: [
    // Other Storybook addons
    '@uxpin/merge-storybook-preset-addon',
  ],
};
```

### 4. Configure and run UXPin Merge with Storybook support enabled

Before running merge, ensure that your UXPin Merge configuration file (normally `uxpin.config.js`) contains `<component>.stories.[js|ts]` entries rather than `<component>.[js|ts]`:

```js
module.exports = {
  components: {
    categories: [
      {
        name: 'General',
        include: [
          // 'src/components/YourComponent.js',
          'src/components/YourComponent.stories.js',
        ]
      },
    ],
    wrapper: 'src/Wrapper/UXPinWrapper.js',
    webpackConfig: 'uxpin.webpack.config.js',
  },
  name: 'YourLibrary'
};
```

After updating the configuration, you may run `uxpin-merge` with the `--storybook` flag:

```shell
$ npx uxpin-merge --disable-tunneling --storybook
```
