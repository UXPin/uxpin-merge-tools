import { join, parse, resolve } from 'path';
import { Configuration } from 'webpack';
import { smart } from 'webpack-merge';

export interface WebpackConfigPaths {
  bundlePath:string;
  projectRoot:string;
  sourcePath:string;
  webpackConfig?:string;
}

type ConfigurationFunction = () => Configuration;

export function getWebpackConfig({
  bundlePath,
  projectRoot,
  sourcePath,
  webpackConfig,
}:WebpackConfigPaths):Configuration {
  const { base, dir } = parse(bundlePath);

  const config:Configuration = {
    entry: [
      resolve(__dirname, './globals/__uxpinParsePreset.js'),
      sourcePath,
    ],
    mode: 'development',
    module: {
      rules: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            babelrc: false,
            plugins: [
              require.resolve('@babel/plugin-proposal-class-properties'),
            ],
            presets: [
              require.resolve('@babel/preset-flow'),
              [require.resolve('@babel/preset-react'), {
                pragma: '__uxpinParsePreset',
              }],
            ],
          },
          test: /\.jsx?$/,
        },
        {
          loader: require.resolve('ignore-loader'),
          test: /\.css$/,
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
      modules: [
        'node_modules',
        resolve('../../../../../../../node_modules'),
      ],
    },
    resolveLoader: {
      modules: [
        'node_modules',
        resolve('../../../../../../../node_modules'),
      ],
    },
  };

  if (webpackConfig) {
    const configProvider:Configuration|ConfigurationFunction = require(join(projectRoot, webpackConfig));
    const userWebpackConfig:Configuration = isConfigurationFunction(configProvider) ? configProvider() : configProvider;
    return smart(userWebpackConfig, config);
  }

  return config;
}

function isConfigurationFunction(conf:Configuration|ConfigurationFunction):conf is ConfigurationFunction {
  return typeof conf === 'function';
}
