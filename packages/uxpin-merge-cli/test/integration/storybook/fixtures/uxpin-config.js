// NOTE: this file is a fixture, to be used by react-bootstrap.test.ts

module.exports = {
  components: {
    categories: [
      {
        name: 'General',
        include: [
          'src/Button/Button.stories.js',
        ],
      },
    ],
    wrapper: 'src/Wrapper/UXPinWrapper.js',
    webpackConfig: 'uxpin.webpack.config.js',
  },
  name: 'Bootstrap'
};
