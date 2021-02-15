import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
import { Configuration } from 'webpack';
import { merge as webpackMerge } from 'webpack-merge';

import { logger } from '../../../utils/logger';
import { BuildOptions } from '../BuildOptions';
import { getComponentLibraryInputPath } from '../library/getComponentLibraryInputPath';

export const DEBUG_APP_BUNDLED_FILE:string = 'index.js';
export const TEMP_DIR_NAME:string = '.uxpin-merge';
export const TEMP_DIR_PATH:string = `./${TEMP_DIR_NAME}`;
export const LIBRARY_INPUT_FILENAME:string = `components.js`;
export const LIBRARY_OUTPUT_FILENAME:string = 'designsystemlibrary.js';
export const DEBUG_WEBPACK_FILENAME:string = 'uxpin.debug.webpack.config.js';

export function getConfig(
  { development, webpackConfigPath, projectRoot, uxpinDirPath, storybookWebpackConfig }:BuildOptions,
):Configuration {
  let config:Configuration = decorateWithDevToolsWhenDevelopment({
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
  }, development);

  if (webpackConfigPath) {
    const userWebpackConfig:Configuration = require(path.join(projectRoot, webpackConfigPath));
    config = webpackMerge(userWebpackConfig, config);
  } else if (storybookWebpackConfig) {
    config = webpackMerge(storybookWebpackConfig, config);
  }

  // Writing out webpack config to degbug
  if (logger.level === 'debug') {
    const debugConfigFilePath:string = path.join(projectRoot, TEMP_DIR_PATH, DEBUG_WEBPACK_FILENAME);
    fs.writeFileSync(debugConfigFilePath, util.inspect(config, false, null));
  }

  return config;
}

function decorateWithDevToolsWhenDevelopment(config:Configuration, development:boolean = false):Configuration {
  if (!development) {
    return config;
  }

  return {
    ...config,
    devtool: 'cheap-module-eval-source-map',
  };
}
