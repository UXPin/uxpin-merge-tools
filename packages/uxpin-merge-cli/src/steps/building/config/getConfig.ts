import { join } from 'path';
import { Configuration } from 'webpack';
import { smart } from 'webpack-merge';

export const DEBUG_APP_BUNDLED_FILE:string = 'index.js';
export const TEMP_DIR_NAME:string = '.uxpin-merge';
export const TEMP_DIR_PATH:string = `./${TEMP_DIR_NAME}`;
export const LIBRARY_INPUT_PATH:string = `${TEMP_DIR_PATH}/components.js`;
export const LIBRARY_METADATA_PATH:string = `${TEMP_DIR_PATH}/designsystem.json`;
export const LIBRARY_OUTPUT_FILENAME:string = 'designsystemlibrary.js';
export const LIBRARY_OUTPUT_PATH:string = `${TEMP_DIR_PATH}/${LIBRARY_OUTPUT_FILENAME}`;

export function getConfig(projectRoot:string, webpackConfigPath?:string, development?:boolean):Configuration {
  const config:Configuration = decorateWithDevToolsWhenDevelopment({
    entry: LIBRARY_INPUT_PATH,
    mode: development ? 'development' : 'production',
    optimization: {
      runtimeChunk: false,
      splitChunks: false,
    },
    output: {
      filename: LIBRARY_OUTPUT_FILENAME,
      libraryTarget: 'commonjs',
      path: join(projectRoot, TEMP_DIR_PATH),
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
  }, development);

  if (webpackConfigPath) {
    const userWebpackConfig:Configuration = require(join(projectRoot, webpackConfigPath));
    return smart(userWebpackConfig, config);
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
