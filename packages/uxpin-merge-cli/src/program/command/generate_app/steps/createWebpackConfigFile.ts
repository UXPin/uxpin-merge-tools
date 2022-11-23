import { pathExists } from 'fs-extra';
import { resolve } from 'path';
import { printLine, printWarning } from '../../../../utils/console/printLine';
import { PrintColor } from '../../../../utils/console/PrintOptions';
import { writeToFile } from '../../../../utils/fs/writeToFile';
import { GenerateAppProgramArgs } from '../../../args/ProgramArgs';
import { Step } from '../../Step';
import { APP_DIRECTORY } from './createAppDirectory';

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
        exclude: /node_modules/
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
export function createWebpackConfigFile(args: GenerateAppProgramArgs): Step {
  return { exec: thunkCreateWebpackConfigFile(args), shouldRun: true };
}

export function thunkCreateWebpackConfigFile(args: GenerateAppProgramArgs): () => Promise<void> {
  return async () => {
    const webpackConfigFile: string = resolve(APP_DIRECTORY, 'webpack.config.js');

    if (!(await pathExists(webpackConfigFile))) {
      await writeToFile(webpackConfigFile, getWebpackFile());
      printLine(`✅ File webpack.config.js created`, { color: PrintColor.GREEN });
    } else {
      printWarning(`👉 File webpack.config.js exists`);
    }
  };
}
