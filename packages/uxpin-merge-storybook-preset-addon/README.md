# UXPin Merge Storybook Add-on

This addon is used to enable [Storybook v6+](https://storybook.js.org/docs) support for [UXPin Merge](https://www.uxpin.com/docs/merge).

## Instructions

### 1. Install UXPin Merge in your Design System repository

If UXPin Merge is not already installed and set up in your storybook enabled repository, install it and [integrate your components integrated](https://www.uxpin.com/docs/merge/integrating-your-own-components#requirements).

### 2. Add this Preset Addon to your Storybook configuration file

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
    "@uxpin/merge-storybook-preset-addon",
  ],
};
```

### 3. Configure and run UXPin Merge with Storybook support enabled

Add `uxpin.config.js` to your root directly.

```js
module.exports = {
  components: {
    categories: [
      {
        name: "General",
        include: [
          // 'src/components/YourComponent.js',
          "src/components/YourComponent.js",
        ],
      },
    ],
  },
  name: "YourLibrary",
};
```

After updating the configuration, you may run `uxpin-merge` with the `--storybook` flag:

```shell
$ npx uxpin-merge --disable-tunneling --storybook
```
