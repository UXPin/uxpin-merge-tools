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
    {
      name: 'Checkbox',
      category: 'General',
      isExportDefault: true,
      packageName: '@mui/material/Checkbox',
      properties: [
        {
          name: 'label',
          type: 'PropTypes.string',
          defaultValue: 'Label',
        },
        {
          name: 'defaultChecked',
          type: 'PropTypes.bool',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'Avatar',
      category: 'General',
      isExportDefault: true,
      packageName: '@mui/material/Avatar',
      properties: [
        {
          name: 'src',
          type: 'PropTypes.string',
          defaultValue: 'https://mui.com/static/images/avatar/1.jpg',
        },
      ],
    },
  ],
};
