import { isEmpty } from 'lodash';
import { join } from 'path';
import { Configuration } from 'webpack';
import { smart } from 'webpack-merge';

export const TEMP_DIR_PATH:string = './.uxpin-temp';
export const LIBRARY_INPUT_PATH:string = `${TEMP_DIR_PATH}/components.js`;
export const LIBRARY_OUTPUT_PATH:string = `${TEMP_DIR_PATH}/designsystemlibrary.js`;

export function getConfig(projectRoot:string, webpackConfigPath:string = ''):Configuration {
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

  if (isEmpty(webpackConfigPath)) {
    return config;
  }

  const userWebpackConfig:Configuration = require(join(projectRoot, webpackConfigPath));
  return smart(userWebpackConfig, config);
}
