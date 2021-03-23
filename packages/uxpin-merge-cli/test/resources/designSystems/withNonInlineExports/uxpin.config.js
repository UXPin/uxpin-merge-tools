module.exports = {
  name: 'Example Design System',
  components: {
    categories: [
      {
        name: 'General',
        include: [
          'src/components/Avatar/Avatar.tsx',
          'src/components/AvatarFn/AvatarFn.tsx',
          'src/components/AvatarFnDefault/AvatarFnDefault.tsx',
          'src/components/AvatarHOC/AvatarHOC.tsx',
          'src/components/ButtonWithIconAsProp/ButtonWithIconAsProp.tsx',
          'src/components/MenuWithData/MenuWithData.tsx',
          'src/components/MenuWithDataHOC/MenuWithDataHOC.tsx',
        ]
      },
    ]
  }
};
