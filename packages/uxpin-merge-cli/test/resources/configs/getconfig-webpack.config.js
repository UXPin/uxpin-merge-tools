const path = require('path');

const ICON_PATH_REGEX = /icons\//;
const IMAGE_PATH_REGEX = /\.(jpe?g|png|gif|svg)$/;

module.exports = {
    target: 'web',
    devtool: 'eval-source-map',
    entry: [
        'react-hot-loader/patch',
        '@shopify/polaris/styles/global.scss',
        path.join(__dirname, 'index.tsx'),
    ],
    output: {
        filename: '[name].js',
        publicPath: '/assets/',
        libraryTarget: 'var',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        alias: {
            '@shopify/polaris': path.resolve(__dirname, '..', 'src'),
        },
    },
    plugins: [],
    module: {
        rules: [
            {
                test(resource) {
                    return ICON_PATH_REGEX.test(resource) && resource.endsWith('.svg');
                },
                use: [
                    {
                        loader: '@shopify/images/icon-loader',
                    },
                    {
                        loader: 'image-webpack-loader',
                    },
                ],
            },
            {
                test(resource) {
                    return IMAGE_PATH_REGEX.test(resource) && !ICON_PATH_REGEX.test(resource);
                },
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        emitFile: true,
                    },
                }],
            },
        ],
    },
};
