import { join } from 'path';
import { Configuration } from 'webpack';
import { smart } from 'webpack-merge';
import { BuildOptions } from '../BuildOptions';
import { getComponentLibraryInputPath } from '../library/getComponentLibraryInputPath';

export const DEBUG_APP_BUNDLED_FILE = 'index.js';
export const TEMP_DIR_NAME = '.uxpin-merge';
export const TEMP_DIR_PATH = `./${TEMP_DIR_NAME}`;
export const LIBRARY_INPUT_FILENAME = `components.js`;
export const LIBRARY_OUTPUT_FILENAME = 'designsystemlibrary.js';

export function getConfig({ development, webpackConfigPath, projectRoot, uxpinDirPath }: BuildOptions): Configuration {
  const config: Configuration = decorateWithDevToolsWhenDevelopment(
    {
      entry: getComponentLibraryInputPath(uxpinDirPath),
      mode: development ? 'development' : 'production',
      optimization: {
        runtimeChunk: false,
        splitChunks: false,
      },
      output: {
        filename: LIBRARY_OUTPUT_FILENAME,
        libraryTarget: 'commonjs',
        path: uxpinDirPath,
      },
      resolve: {
        extensions: ['.js', '.jsx'],
      },
    },
    development
  );

  if (webpackConfigPath) {
    const userWebpackConfig: Configuration = require(join(projectRoot, webpackConfigPath));
    return smart(userWebpackConfig, config);
  }

  return config;
}

function decorateWithDevToolsWhenDevelopment(config: Configuration, development = false): Configuration {
  if (!development) {
    return config;
  }

  return {
    ...config,
    devtool: 'cheap-module-eval-source-map',
  };
}
