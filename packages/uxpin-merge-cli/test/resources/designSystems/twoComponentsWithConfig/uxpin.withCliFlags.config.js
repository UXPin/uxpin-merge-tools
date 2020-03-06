module.exports = {
  name: 'Example Design System',
  components: {
    categories: [
      {
        name: 'General',
        include: [
          'src/components/Avatar/Avatar.tsx',
        ]
      },
      {
        name: 'Forms',
        include: 'src/components/Button/Button.tsx',
      },
    ],
    wrapper: 'src/components/WrapperComponent.ts',
    webpackConfig: 'webpack.banner.config.js',
  }
};
