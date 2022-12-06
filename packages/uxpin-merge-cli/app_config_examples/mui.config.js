module.exports = {
  packages: ['@mui/material', '@emotion/react', '@emotion/styled'],
  npmrc: '',
  webpack: true,
  wrapper: 'UXPinWrapper.jsx',
  webpackLoaders: [],
  components: [
    {
      name: 'Button',
      category: 'General',
      importStatement: 'import Button from @mui/material/Button;',
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
      importStatement: 'import Checkbox from @mui/material/Checkbox;',
      properties: [
        {
          name: 'label',
          type: 'PropTypes.string',
          defaultValue: 'Label',
          uxpinPropName: 'Label',
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
      importStatement: 'import Avatar from @mui/material/Avatar;',
      properties: [
        {
          name: 'src',
          type: 'PropTypes.string',
          defaultValue: 'https://mui.com/static/images/avatar/1.jpg',
          uxpinDescription: 'Background image url',
        },
      ],
    },
  ],
};
