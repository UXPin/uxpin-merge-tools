module.exports = {
    name: 'Example Design System',
    components: {
        categories: [
            {
                name: 'General',
                include: [
                    'src/components/Avatar/Avatar.jsx',
                ]
            },
            {
                name: 'Forms',
                include: 'src/components/Button/Button.jsx'
            },
        ]
    }
};
