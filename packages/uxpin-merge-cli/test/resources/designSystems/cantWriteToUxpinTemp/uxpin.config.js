module.exports = {
  name: 'Library from Code',
  components: {
    categories: [
      {
        name: 'General',
        include: [
          'src/components/*/*.jsx',
        ],
      },
    ]
  }
};
