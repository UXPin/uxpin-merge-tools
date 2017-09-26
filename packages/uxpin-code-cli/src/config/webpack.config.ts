import { Configuration } from 'webpack';

import { BabelPlugin } from '../building/plugins/BabelPlugin';
import { LibraryTarget } from './LibraryTarget';

export const TEMP_DIR_PATH:string = './.uxpin-temp';
export const LIBRARY_INPUT_PATH:string = `${TEMP_DIR_PATH}/components.js`;
export const LIBRARY_OUTPUT_PATH:string = `${TEMP_DIR_PATH}/designsystemlibrary.js`;

export function getConfig(babelPlugins:BabelPlugin[] = [], target:LibraryTarget = 'amd'):Configuration {
  return {
    entry: LIBRARY_INPUT_PATH,
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: [{
            loader: 'babel-loader',
            options: {
              babelrc: false,
              plugins: babelPlugins,
              presets: [
                'react',
                ['env', {
                  targets: {
                    browsers: ['last 2 versions'],
                  },
                }],
                'stage-0',
              ],
            },
          }],
        },
      ],
    },
    output: {
      filename: LIBRARY_OUTPUT_PATH,
      libraryTarget: target,
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
  };
}
