module.exports = {
    module: {
        rules: [
            {
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    plugins: [
                        '@babel/plugin-proposal-class-properties',
                    ],
                    presets: [
                        ['@babel/env', {
                            targets: {
                                browsers: ['last 1 version'],
                            },
                        }],
                        '@babel/react',
                    ],
                },
                test: /\.jsx?$/,
            },
            {
                loader: 'ignore-loader',
                test: /\.css$/,
            },

        ],
    },
    resolve: {
            extensions: ['.js', '.jsx'],
    },
};
