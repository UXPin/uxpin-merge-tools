module.exports = {
  name: 'Example Design System',
  components: {
    categories: [
      {
        name: 'General',
        include: [
          'src/components/Avatar/Avatar.tsx',
          'src/components/Button/Button.tsx',
        ]
      },
    ]
  }
};
