import { isEmpty } from 'lodash';
import { join, relative } from 'path';
import { Configuration } from 'webpack';
import { smart } from 'webpack-merge';

export const TEMP_DIR_PATH:string = './.uxpin-temp';
export const LIBRARY_INPUT_PATH:string = `${TEMP_DIR_PATH}/components.js`;
export const LIBRARY_OUTPUT_PATH:string = `${TEMP_DIR_PATH}/designsystemlibrary.js`;

export function getConfig(webpackConfigPath:string = ''):Configuration {
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

  const path:string = relative(__dirname, join(process.cwd(), webpackConfigPath));
  const userWebpackConfig:Configuration = require(path);
  return smart(userWebpackConfig, config);
}
