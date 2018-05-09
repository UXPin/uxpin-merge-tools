module.exports = {
  components: {
    categories: [
      {
        name: 'Uncategorized',
        include: [
          'src/Button/Button.js',
          'src/Card/Card.js',
          'src/Dropdown/Dropdown.js',
          'src/Link/Link.js',
          'src/Menu/Menu.js',
          'src/Popover/Popover.js',
          'src/Portal/Portal.js',
          'src/TextInput/TextInput.js',
        ]
      },
      {
        name: 'Icons',
        include: 'src/Icon/!(index).js'
      }
    ]
  }
};
