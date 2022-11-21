module.exports = {
  packages: ['@mui/material', '@emotion/react', '@emotion/styled'],
  npmrc: '',
  components: [
    {
      name: 'Button',
      category: 'General',
      isExportDefault: true,
      packageName: '@mui/material/Button',
      properties: [
        {
          name: 'variant',
          type: 'PropTypes.string',
          defaultValue: 'contained',
        },
        {
          name: 'children',
          type: 'PropTypes.node',
          defaultValue: 'Hello world',
        },
      ],
    },
  ],
};
