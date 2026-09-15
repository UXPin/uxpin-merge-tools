import { join, parse, resolve } from 'path';
import { Configuration } from 'webpack';
import { smartStrategy } from 'webpack-merge';
import * as VirtualModulesPlugin from 'webpack-virtual-modules';
import { VirtualComponentModule } from './generateVirtualModules';

export interface WebpackConfigPaths {
  bundlePath: string;
  projectRoot: string;
  sourcePath: string;
  virtualModules: VirtualComponentModule[];
  webpackConfig?: string;
  /** A real directory whose node_modules the project's imports resolve against. */
  packagesRoot?: string;
  /** Sources of a project that is not on disk, by absolute path. */
  virtualFiles?: Record<string, string>;
}

type ConfigurationFunction = () => Configuration;

export function getPresetsBundleWebpackConfig({
  bundlePath,
  projectRoot,
  sourcePath,
  virtualModules,
  webpackConfig,
  packagesRoot,
  virtualFiles,
}: WebpackConfigPaths): Configuration {
  const { base, dir } = parse(bundlePath);
  // A project held in memory has no node_modules under its root, so the
  // packages it imports are looked up where the caller keeps them.
  const packageDirs: string[] = packagesRoot ? [join(packagesRoot, 'node_modules')] : [];

  const config: Configuration = {
    entry: [resolve(__dirname, './globals/__uxpinParsePreset.js'), sourcePath],
    mode: 'development',
    module: {
      rules: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            babelrc: false,
            plugins: [require.resolve('@babel/plugin-transform-class-properties')],
            presets: [
              require.resolve('@babel/preset-flow'),
              [
                require.resolve('@babel/preset-react'),
                {
                  pragma: '__uxpinParsePreset',
                },
              ],
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
    plugins: [getVirtualModulesPlugin(virtualModules, virtualFiles)],
    resolve: {
      extensions: ['.js', '.jsx'],
      modules: [
        'node_modules',
        ...packageDirs,
        // @todo remove it after refactoring integration test structure
        resolve('../../../../../../../node_modules'),
      ],
    },
    resolveLoader: {
      modules: [
        'node_modules',
        ...packageDirs,
        // @todo remove it after refactoring integration test structure
        resolve('../../../../../../../node_modules'),
      ],
    },
  };

  if (webpackConfig) {
    const configProvider: Configuration | ConfigurationFunction = require(join(projectRoot, webpackConfig));
    const userWebpackConfig: Configuration = isConfigurationFunction(configProvider)
      ? configProvider()
      : configProvider;
    return smartStrategy({ entry: 'replace' })(userWebpackConfig, config);
  }

  return config;
}

function getVirtualModulesPlugin(
  virtualModules: VirtualComponentModule[],
  virtualFiles: Record<string, string> = {}
): any {
  // The component placeholders come last: where a project file and a
  // placeholder describe the same module, the placeholder is the point.
  return new VirtualModulesPlugin(
    virtualModules.reduce((result, { moduleSource, path }) => ({ ...result, [path]: moduleSource }), {
      ...virtualFiles,
    })
  );
}

function isConfigurationFunction(conf: Configuration | ConfigurationFunction): conf is ConfigurationFunction {
  return typeof conf === 'function';
}
