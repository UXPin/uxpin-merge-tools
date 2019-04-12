module.exports = {
  name: 'Example Design System',
  components: {
    categories: [
      {
        name: 'General',
        include: [
          'src/components/Avatar/Avatar.tsx',
          'src/components/NotExists/Avatar.tsx',
        ]
      },
      {
        name: 'Forms',
        include: 'src/components/Button/Button.tsx'
      },
    ]
  }
};
