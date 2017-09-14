const CONFIG:any = {
  entry: './src/components.js',
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
            ],
          },
        }],
      },
    ],
  },
  output: {
    filename: 'components.js',
    library: 'Components',
    libraryTarget: 'amd',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

const LOADER_BABEL:string = 'babel-loader';

function getConfigDecoratedWithLibraries(libraries:string[], target:string):any {
  const config:any = Object.assign({}, CONFIG);

  config.output.libraryTarget = target;

  config.module.rules.forEach((rule:any) => {
    if (!rule || !rule.use) {
      return;
    }

    rule.use.forEach((loader:any) => {
      if (loader.loader === LOADER_BABEL) {
        loader.options.plugins = libraries;
      }
    });
  });

  return config;
}

export function getConfig(libraries:string[], target:string):any {
  return getConfigDecoratedWithLibraries(libraries, target);
}
