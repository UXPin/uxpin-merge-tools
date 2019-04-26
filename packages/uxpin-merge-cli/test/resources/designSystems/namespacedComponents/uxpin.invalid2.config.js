module.exports = {
  name: 'Example Design System',
  components: {
    categories: [
      {
        name: 'Card',
        include: [
          'src/components/Card/**/*.tsx',
          'src/components/Card/*.tsx',
        ],
      },
      {
        name: 'Other',
        include: [
          'src/components/Header/*.tsx',
        ],
      },
    ]
  }
};
