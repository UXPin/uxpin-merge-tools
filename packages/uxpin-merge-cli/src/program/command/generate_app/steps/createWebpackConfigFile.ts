import { pathExists } from 'fs-extra';
import { resolve } from 'path';
import { printLine, printWarning } from '../../../../utils/console/printLine';
import { PrintColor } from '../../../../utils/console/PrintOptions';
import { writeToFile } from '../../../../utils/fs/writeToFile';
import { GenerateAppProgramArgs } from '../../../args/ProgramArgs';
import { Step } from '../../Step';
import { APP_DIRECTORY } from './createAppDirectory';
import { yesNo } from '../../../utils/yesNo';
import { AppConfig } from '../types/appConfig';

function getWebpackFile(): string {
  return `const path = require("path");
const webpack = require("webpack");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "/"
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
  resolve: {
    modules: [__dirname, "node_modules"],
    extensions: ["*", ".js", ".jsx", ".mjs"]
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        loader: require.resolve('babel-loader'),
        exclude: /node_modules/,
        test: /\\.jsx?$/,
        options: {
          presets: [
              require.resolve('@babel/preset-env'),
              require.resolve('@babel/preset-react')
          ],
        }
      },
    ]
  }
}`;
}

export let webpackConfigPath = '';

export function createWebpackConfigFile(args: GenerateAppProgramArgs, appConfig?: AppConfig): Step {
  return { exec: thunkCreateWebpackConfigFile(args, appConfig), shouldRun: true };
}

export function thunkCreateWebpackConfigFile(args: GenerateAppProgramArgs, appConfig?: AppConfig): () => Promise<void> {
  return async () => {
    if (!appConfig || !appConfig.webpack) {
      return;
    }

    const webpackConfigFileName = typeof appConfig.webpack === 'string' ? appConfig.webpack : 'webpack.config.js';

    webpackConfigPath = resolve(APP_DIRECTORY, webpackConfigFileName);
    let shouldOverwriteFile = true;

    if (await pathExists(webpackConfigPath)) {
      shouldOverwriteFile = await yesNo(
        `The file ${webpackConfigFileName} already exists. Do you want to overwrite it`
      );
    }

    if (shouldOverwriteFile) {
      await writeToFile(webpackConfigPath, getWebpackFile());
      printLine(`✅ File ${webpackConfigFileName} created`, { color: PrintColor.GREEN });
    }
  };
}
