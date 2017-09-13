export const config:any = {
  entry: './src/components.js',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [{
          loader: 'babel-loader',
          options: {
            babelrc: false,
            plugins: [
              'transform-class-properties',
              'transform-object-rest-spread',
            ],
            presets: [
              'react',
              ['env', {
                targets: {
                  browsers: ['last 2 versions'],
                },
              }],
            ],
          },
        }],
      },
    ],
  },
  output: {
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
