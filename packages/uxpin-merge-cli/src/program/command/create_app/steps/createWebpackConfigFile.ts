import { pathExists } from 'fs-extra';
import { resolve } from 'path';
import { printLine, printWarning } from '../../../../utils/console/printLine';
import { PrintColor } from '../../../../utils/console/PrintOptions';
import { writeToFile } from '../../../../utils/fs/writeToFile';
import { Step } from '../../Step';
import { APP_DIRECTORY } from './createAppDirectory';

const WEBPACK_FILE:string =
`
const path = require("path");
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
        extensions: ["*", ".js", ".jsx"]
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\\.css$/,
                use: [
                    {
                        loader: require.resolve('style-loader'),
                    },
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                          importLoaders: 1,
                        }
                    },
                ]
            },
            {
                loader: require.resolve('babel-loader'),
                test: /\\.jsx?$/,
                exclude: /node_modules/,
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
export function createWebpackConfigFile():Step {
  return { exec: thunkCreateWebpackConfigFile(), shouldRun: true };
}

export function thunkCreateWebpackConfigFile():() => Promise<void> {
  return async () => {
    const webpackConfigFile:string = resolve(APP_DIRECTORY, 'webpack.config.js');
    if (!await pathExists(webpackConfigFile)) {
      await writeToFile(webpackConfigFile, WEBPACK_FILE);
      printLine(`✅ File webpack.config.js created`, { color: PrintColor.GREEN });
    } else {
      printWarning(`👉 File webpack.config.js exists`);
    }
  };
}
