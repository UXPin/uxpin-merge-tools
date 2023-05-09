// Needed to fix error when running coverage on untested files, on CI.
// > Failed to collect coverage src/resources/Button/Button.js
// > Support for the experimental syntax 'jsx' isn't currently enabled
module.exports = {
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', {runtime: 'automatic'}],
  ],
};
