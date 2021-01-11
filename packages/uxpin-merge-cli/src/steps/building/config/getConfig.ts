import { writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { Configuration } from 'webpack';
import { merge as webpackMerge } from 'webpack-merge';
import { BuildOptions } from '../BuildOptions';
import { getComponentLibraryInputPath } from '../library/getComponentLibraryInputPath';

export const DEBUG_APP_BUNDLED_FILE:string = 'index.js';
export const TEMP_DIR_NAME:string = '.uxpin-merge';
export const TEMP_DIR_PATH:string = `./${TEMP_DIR_NAME}`;
export const LIBRARY_INPUT_FILENAME:string = `components.js`;
export const LIBRARY_OUTPUT_FILENAME:string = 'designsystemlibrary.js';

export function getConfig(
  {
    development,
    webpackConfigPath,
    projectRoot,
    uxpinDirPath,
    storybook,
    storybookWebpackConfigPath,
  }:BuildOptions,
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

  // Join the webpack configuration for the project with the config defined above
  if (webpackConfigPath) {
    const userWebpackConfig:Configuration = require(join(projectRoot, webpackConfigPath));
    config = webpackMerge(userWebpackConfig, config);
  }

  if (storybookWebpackConfigPath) {
    writeFileSync(
      join(dirname(storybookWebpackConfigPath), "webpackConfig.before.json"),
      JSON.stringify(config, null, '  '),
    );
  }

  // Add storybook configuration if storybook is enabled
  if (storybook && storybookWebpackConfigPath) {
    const storybookWebpackConfig:any = require(join(projectRoot, storybookWebpackConfigPath));
    config = webpackMerge(storybookWebpackConfig, config);
  }

  if (storybookWebpackConfigPath) {
    writeFileSync(
      join(dirname(storybookWebpackConfigPath), "webpackConfig.after.json"),
      JSON.stringify(config, null, '  '),
    );
  }

  // console.log("MERGED CONFIG?", config);

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
