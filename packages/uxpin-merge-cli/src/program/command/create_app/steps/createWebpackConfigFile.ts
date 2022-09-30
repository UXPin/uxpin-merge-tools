import { pathExists } from 'fs-extra';
import { resolve } from 'path';
import { printLine, printWarning } from '../../../../utils/console/printLine';
import { PrintColor } from '../../../../utils/console/PrintOptions';
import { writeToFile } from '../../../../utils/fs/writeToFile';
import { CreateAppProgramArgs } from '../../../args/ProgramArgs';
import { Step } from '../../Step';
import { APP_DIRECTORY } from './createAppDirectory';

function getWebpackFile(shouldExcludeNodeModules:boolean):string {
  return `
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
            extensions: ["*", ".js", ".jsx", ".mjs"]
        },
        devtool: "source-map",
        module: {
            rules: [
                {
                  test: /\\.mjs$/,
                  include: /node_modules/,
                  type: 'javascript/auto'
                },
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
                    test: /\\.m?jsx?$/,
                    ${shouldExcludeNodeModules ? 'exclude: /node_modules/,' : ''}
                    options: {
                        presets: [
                            require.resolve('@babel/preset-env'),
                            require.resolve('@babel/preset-react')
                        ],
                        plugins: [
                          require.resolve('@babel/plugin-proposal-nullish-coalescing-operator'),
                        ],
                    }
                },
            ]
        }
    }
  `;
}
export function createWebpackConfigFile(args:CreateAppProgramArgs):Step {
  return { exec: thunkCreateWebpackConfigFile(args), shouldRun: true };
}

export function thunkCreateWebpackConfigFile(args:CreateAppProgramArgs):() => Promise<void> {
  return async () => {
    const webpackConfigFile:string = resolve(APP_DIRECTORY, 'webpack.config.js');
    let packages:Array<{ name:string, version?:string}> = [];
    try {
      packages = JSON.parse(args.packages || '');
    } catch (e) {
      //do nothing
    }

  ./bin/uxpin-integrate-package --token='ccc4b0afb640cceab88597233b822adb2828c811' --packages='[{"name":"@chakra-ui/react","version":"latest"},{"name":"@emotion/react","version":"latest"},{"name":"@emotion/styled","version":"latest"},{"name":"framer-motion","version":"latest"}]' --components='[{"categoryName":"abc","components":[{"name":"Button","packageName":"@chakra-ui/react"}, {"name":"ChakraProvider","packageName":"@chakra-ui/react"}]}]' --uxpin-domain='uxpin.dev'

    {"f3286331-5285-42f6-94f4-4a8811574540":
      {"name": "a", "imports": {"210ec9ce-3751-5125-af10-31ea3be9219a": {"name": "Button", "package": "@chakra-ui/react"}, "38796d4e-eb30-5fcf-aa16-14140605e196": {"name": "ChakraProvider", "package": "@chakra-ui/react"}, "7c691137-34e7-5e5e-99bc-d118c9591f5e": {"name": "Breadcrumb", "package": "antd"}, "f2c2ade9-a1f4-5792-9a84-dc283eaf84d9": {"name": "DatePicker", "package": "antd"}}}}


    const shouldExcludeNodeModules:boolean = !packages
        .find((packageData) => ['@chakra-ui/react'].includes(packageData.name));

    if (!await pathExists(webpackConfigFile)) {
      await writeToFile(webpackConfigFile, getWebpackFile(shouldExcludeNodeModules));
      printLine(`✅ File webpack.config.js created`, { color: PrintColor.GREEN });
    } else {
      printWarning(`👉 File webpack.config.js exists`);
    }
  };
}
