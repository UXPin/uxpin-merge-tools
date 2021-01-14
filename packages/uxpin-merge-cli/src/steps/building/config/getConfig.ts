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

    // Look through the storybook webpack config and remove any loaders that are babel-loaders
    // storybook's loaders interfere with the loading done for js and ts files locally and cause the
    // exported bundle to not have any static exports (and be much shorter than normal)
    if (storybookWebpackConfig.module && storybookWebpackConfig.module.rules) {
      storybookWebpackConfig.module.rules = storybookWebpackConfig.module.rules.filter((r: any) => {
        // Ensure that the rule has a non babel-loader
        if (r.loader && r.loader.includes("babel-loader/lib/index.js") && r.test === "/\\.(js|mjs|jsx|ts|tsx)$/") {
          return false;
        }

        // Allow non-oneOf rules thorugh
        if (!r.oneOf) { return true; }

        // Do the same if dealing with a oneOf rule (which is an aggregate)
        r.oneOf = r.oneOf.filter((r: any) => {
          if (r.loader && r.loader.includes("babel-loader/lib/index.js") && r.test === "/\\.(js|mjs|jsx|ts|tsx)$/") {
            return false;
          }

          return true;
        });

      });

    }

    // Merge the storybook webpack config with the app config
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
