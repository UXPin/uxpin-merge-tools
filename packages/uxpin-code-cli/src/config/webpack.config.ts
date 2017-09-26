import { BabelPlugin } from '../building/plugins/BabelPlugin';

export const TEMP_DIR_PATH:string = './.uxpin-temp';
export const LIBRARY_INPUT_PATH:string = `${TEMP_DIR_PATH}/components.js`;
export const LIBRARY_OUTPUT_PATH:string = `${TEMP_DIR_PATH}/designsystemlibrary.js`;

const LOADER_BABEL:string = 'babel-loader';

const CONFIG:any = {
  entry: LIBRARY_INPUT_PATH,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [{
          loader: 'babel-loader',
          options: {
            babelrc: false,
            plugins: [
            ],
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
    libraryTarget: 'amd',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

export function getConfig(babelPlugins:BabelPlugin[], target?:string):any {
  return getConfigDecoratedWithLibraries(babelPlugins, target);
}

function getConfigDecoratedWithLibraries(babelPlugins:BabelPlugin[], target?:string):any {
  const config:any = Object.assign({}, CONFIG);

  if (target) {
    config.output.libraryTarget = target;
  }

  config.module.rules.forEach((rule:any) => {
    if (!rule || !rule.use) {
      return;
    }

    rule.use.forEach((loader:any) => {
      if (loader.loader === LOADER_BABEL) {
        loader.options.plugins = babelPlugins;
      }
    });
  });

  return config;
}
