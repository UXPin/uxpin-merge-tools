module.exports = {
  components: {
    categories: [
      {
        name: 'Uncategorized',
        include: [
          'src/*/*.jsx',
          '!src/*/*-test.jsx',
          '!src/*/decorator.jsx'
        ]
      }
    ]
  }
};
