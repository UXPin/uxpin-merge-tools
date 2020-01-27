module.exports = {
  components: {
    categories: [
      {
        name: 'Uncategorized',
        include: [
          'src/components/*.js',
          '!src/components/*.stories.js',
          '!src/components/index.js'
        ]
      }
    ]
  }
};
