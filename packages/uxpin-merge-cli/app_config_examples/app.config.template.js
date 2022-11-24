module.exports = {
  packages: [], // list of packages which we want to install, can be empty
  npmrc: '', // content of .npmrc file needed for private packages,
  webpack: true, // if true basic webpack.config file is generated and additional packages (like babel-loader) installed
  components: [
    // array of components
    {
      name: 'Button', // name of component,
      category: 'General', // name of component category,
      isExportDefault: true, // flag which indicates that component is exported default or not,
      packageName: '@mui/material/Button', // package name from which component is imported, can be path to component
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
