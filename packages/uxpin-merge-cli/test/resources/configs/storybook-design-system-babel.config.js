// babel.config.js for storybook DS. This is required for now because
// react-docgen(serialize props) doesn't work well if `@babel/preset-typescript` is specified here.
module.exports = (api) => {
  api.cache(true);

  return {
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
  };
};
