import * as path from 'path';
import { Configuration } from 'webpack';
import { merge as webpackMerge } from 'webpack-merge';
import { BuildOptions } from '../BuildOptions';
import { getComponentLibraryInputPath } from '../library/getComponentLibraryInputPath';

export const DEBUG_APP_BUNDLED_FILE:string = 'index.js';
export const TEMP_DIR_NAME:string = '.uxpin-merge';
export const TEMP_DIR_PATH:string = `./${TEMP_DIR_NAME}`;
export const LIBRARY_INPUT_FILENAME:string = `components.js`;
export const LIBRARY_OUTPUT_FILENAME:string = 'designsystemlibrary.js';

// Storybook generated webpack related variables
export const SB_WEBPACK_JS_LOADER_TEST:string = '/\\.(js|mjs|jsx|ts|tsx)$/';
export const SB_WEBPACK_BABEL_LOADER_SUFFIX:string = 'babel-loader/lib/index.js';

// Check whether an object that looks like a generated webpack loader configuration
// looks like something meant to load .js/.ts files via babel-loader
function isJSWebpackLoader(o:any):boolean {
  return typeof o === 'object'
    && 'loader' in o && o.loader && Array.isArray(o.loader)
    && o.loader.includes(SB_WEBPACK_BABEL_LOADER_SUFFIX)
    && 'test' in o && typeof o.test === 'string'
    && o.test === SB_WEBPACK_JS_LOADER_TEST;
}

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
    const userWebpackConfig:Configuration = require(path.join(projectRoot, webpackConfigPath));
    config = webpackMerge(userWebpackConfig, config);
  }

  // Add storybook configuration if storybook is enabled
  if (storybook && storybookWebpackConfigPath) {
    const storybookWebpackConfig:any = require(path.join(projectRoot, storybookWebpackConfigPath));

    // Look through the storybook webpack config and remove any loaders that are babel-loaders
    // storybook's loaders interfere with the loading done for js and ts files locally and cause the
    // exported bundle to not have any static exports (and be much shorter than normal)
    if (storybookWebpackConfig.module && storybookWebpackConfig.module.rules) {
      storybookWebpackConfig.module.rules = storybookWebpackConfig.module.rules.filter((r:any) => {
        // Filter out any webpack loaders that storybook is trying to use
        if (isJSWebpackLoader(r)) {
          return false;
        }

        // If the loader rule is not a oneOf (and is not for js) it can be included
        if (!r.oneOf) { return true; }

        // Do the same if dealing with a oneOf rule (which is an aggregate)
        r.oneOf = r.oneOf.filter((o:any) => {
          // Remove js loaders in 'oneOf' composite loaders
          if (isJSWebpackLoader(o)) {
            return false;
          }

          return true;
        });
      });
    }

    // Merge the storybook webpack config with the app config
    config = webpackMerge(storybookWebpackConfig, config);
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
