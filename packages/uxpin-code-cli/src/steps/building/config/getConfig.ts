import { join } from 'path';
import { Configuration } from 'webpack';
import { smart } from 'webpack-merge';

export const BUNDLE_FILE:string = 'bundle.js';
export const TEMP_DIR_PATH:string = './.uxpin-temp';
export const LIBRARY_INPUT_PATH:string = `${TEMP_DIR_PATH}/components.js`;
export const LIBRARY_METADATA_PATH:string = `${TEMP_DIR_PATH}/designsystem.json`;
export const LIBRARY_OUTPUT_PATH:string = `${TEMP_DIR_PATH}/designsystemlibrary.js`;

export function getConfig(projectRoot:string, webpackConfigPath?:string):Configuration {
  const config:Configuration = {
    entry: LIBRARY_INPUT_PATH,
    output: {
      filename: LIBRARY_OUTPUT_PATH,
      libraryTarget: 'commonjs',
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
  };

  if (webpackConfigPath) {
    const userWebpackConfig:Configuration = require(join(projectRoot, webpackConfigPath));
    return smart(userWebpackConfig, config);
  }
  return config;
}
