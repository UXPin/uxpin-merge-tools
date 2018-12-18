import { parse } from 'path';
import { Configuration } from 'webpack';

export interface WebpackConfigPaths {
  bundlePath:string;
  sourcePath:string;
}

export function getWebpackConfig({ bundlePath, sourcePath }:WebpackConfigPaths):Configuration {
  const { base, dir } = parse(bundlePath);

  const config:Configuration = {
    entry: sourcePath,
    mode: 'production',
    module: {
      rules: [
        {
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            plugins: [
              'flow-react-proptypes',
              'transform-class-properties',
            ],
            presets: [
              ['@babel/env', {
                targets: {
                  browsers: ['last 1 version'],
                  // modules: 'commonjs',
                },
              }],
              '@babel/react',
              '@babel/preset-flow',
            ],
          },
          test: /\.js$/,
        },
      ],
    },
    optimization: {
      runtimeChunk: false,
      splitChunks: false,
    },
    output: {
      filename: base,
      libraryTarget: 'commonjs',
      path: dir,
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
  };

  return config;
}
