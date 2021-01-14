import { join, parse, resolve } from 'path';
import { Configuration } from 'webpack';
import { CustomizeRule, mergeWithRules as webpackMergeWithRules } from 'webpack-merge';
import * as VirtualModulesPlugin from 'webpack-virtual-modules';
import { VirtualComponentModule } from './generateVirtualModules';

export interface WebpackConfigPaths {
  bundlePath:string;
  projectRoot:string;
  sourcePath:string;
  virtualModules:VirtualComponentModule[];
  webpackConfig?:string;
}

type ConfigurationFunction = () => Configuration;

export function getPresetsBundleWebpackConfig({
  bundlePath,
  projectRoot,
  sourcePath,
  virtualModules,
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
    plugins: [
      getVirtualModulesPlugin(virtualModules),
    ],
    resolve: {
      extensions: ['.js', '.jsx'],
      modules: [
        'node_modules',
        // @todo remove it after refactoring integration test structure
        resolve('../../../../../../../node_modules'),
      ],
    },
    resolveLoader: {
      modules: [
        'node_modules',
        // @todo remove it after refactoring integration test structure
        resolve('../../../../../../../node_modules'),
      ],
    },
  };

  if (webpackConfig) {
    const configProvider:Configuration|ConfigurationFunction = require(join(projectRoot, webpackConfig));
    const userWebpackConfig:Configuration = isConfigurationFunction(configProvider) ? configProvider() : configProvider;
    return webpackMergeWithRules({ entry: CustomizeRule.Replace })(userWebpackConfig, config);
  }

  return config;
}

function getVirtualModulesPlugin(virtualModules:VirtualComponentModule[]):any {
  return new VirtualModulesPlugin(
    virtualModules.reduce((result, { moduleSource, path }) => ({ ...result, [path]: moduleSource }), {}),
  );
}

function isConfigurationFunction(conf:Configuration|ConfigurationFunction):conf is ConfigurationFunction {
  return typeof conf === 'function';
}
