module.exports = {
  packages: [], // list of packages which we want to install, can be empty
  npmrc: '', // content of .npmrc file needed for private packages,
  webpack: true, // if true basic webpack.config file is generated and additional packages (like babel-loader) installed
  wrapper: 'UXPinWrapper.jsx', // name of wrapper file, it will be generated in components directory
  webpackLoaders: ['svg', 'sass', 'less', 'css', 'url', 'file'],
  components: [
    // array of components
    {
      name: 'Button', // name of component,
      category: 'General', // name of component category,
      importStatement: 'import Button from @mui/material/Button', // import statement
      properties: [
        // array of props
        {
          name: 'variant', // name of property
          type: 'PropTypes.string', // type of property (React propTypes is used)
          defaultValue: 'contained', // default value of property, optional
        },
      ],
    },
  ],
};
