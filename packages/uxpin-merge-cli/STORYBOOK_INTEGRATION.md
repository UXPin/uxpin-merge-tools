## What is storybook integration?
UXPin merge require following files to start using
- [uxpin.config.js](https://www.uxpin.com/docs/merge/config-file/)
- [uxpin.webpack.config.js](https://www.uxpin.com/docs/merge/webpack-configuration/)
- OPTIONAL: [Preset file](https://www.uxpin.com/docs/merge/authoring-and-managing-jsx-presets/)
- OPTIONAL: [Wrapper Component](https://www.uxpin.com/docs/merge/wrapper-component/)

And this integration tries to leverage storybook configuration file to skip requiring those file. As of April 2nd 2021, `uxpin.config.js` and `uxpin.webpack.config.js` files are not required to create.

## Installation steps

1. Set .npmrc to install package from github package
```
echo @uxpin:registry=https://npm.pkg.github.com/ > .npmrc
```

2. Add @uxpin/merge-cli package
`yarn add @uxpin/merge-cli@2.7.4-dev-dev.34`

3. Add @uxpin/merge-storybook-preset-addon
`yarn add @uxpin/merge-storybook-preset-addon@1.0.0-dev.2`

4. Add `@uxpin/merge-storybook-preset-addon` to storybook `main.js`

```
module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.js', '../src/**/*.stories.tsx'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-storysource', '@storybook/addon-a11y', '@uxpin/merge-storybook-preset-addon'],
};
```

5. Start experimental mode
```
npx uxpin-merge --disable-tunneling --storybook
```

If you would like to use your custom [uxpin.config.js](https://www.uxpin.com/docs/merge/config-file/) file, you can do
```
npx uxpin-merge --disable-tunneling --storybook --config uxpin.config.js
```

This is useful sometimes such as when you would like to ignore some components from merge library.

6. Push to UXPin
```
npx uxpin-merge push --storybook --token TOKEN
```
