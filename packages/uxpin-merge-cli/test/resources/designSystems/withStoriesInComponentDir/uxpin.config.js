module.exports = {
  name: 'Example Design System',
  components: {
    categories: [
      {
        name: 'General',
        include: [
          'src/components/Avatar/Avatar.tsx',
          'src/components/ButtonWithIconAsProp/ButtonWithIconAsProp.tsx',
          'src/components/MenuWithData/MenuWithData.tsx',
        ]
      },
      {
        name: 'Icons',
        include: [
          'src/icons/IconStart/IconStar.tsx',
        ],
      },
    ]
  }
};
