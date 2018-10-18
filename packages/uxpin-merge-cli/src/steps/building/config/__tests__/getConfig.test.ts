import { resolve } from 'path';
import { Configuration, Rule } from 'webpack';
import { getConfig, LIBRARY_INPUT_PATH, LIBRARY_OUTPUT_FILENAME, TEMP_DIR_NAME } from '../getConfig';

describe('getConfig', () => {
  const projectRoot:string = resolve(__dirname, '../../../../../test/resources/configs/');

  describe('when webpack config is defined', () => {
    const webpackConfigPath:string = './getconfig-webpack.config.js';
    let rules:Rule[];

    beforeEach(() => {
      rules = [
        {
          test: expect.any(Function),
          use: [
            { loader: '@shopify/images/icon-loader' },
            { loader: 'image-webpack-loader' },
          ],
        },
        {
          test: expect.any(Function),
          use: [{
            loader: 'url-loader',
            options: {
              emitFile: true,
              limit: 10000,
            },
          }],
        },
      ];
    });

    describe('and is development mode', () => {
      it('returns merged configuration from specific file with \'cheap-module-eval-source-map\ devtool ' +
        'and with development mod', () => {
        // given
        const expectedConfig:Configuration = {
          devtool: 'cheap-module-eval-source-map',
          entry: LIBRARY_INPUT_PATH,
          mode: 'development',
          module: { rules },
          optimization: {
            runtimeChunk: false,
            splitChunks: false,
          },
          output: {
            filename: LIBRARY_OUTPUT_FILENAME,
            libraryTarget: 'commonjs',
            path: resolve(projectRoot, `./${TEMP_DIR_NAME}`),
            publicPath: '/assets/',
          },
          plugins: [],
          resolve: {
            alias: {
              '@shopify/polaris': resolve(projectRoot, '..', 'src'),
            },
            extensions: ['.ts', '.tsx', '.js', '.json', '.js', '.jsx'],
          },
          target: 'web',
        };

        // when
        const config:Configuration = getConfig(projectRoot, webpackConfigPath, true);

        // then
        expect(config).toEqual(expectedConfig);
      });
    });

    describe('and is not development mode', () => {
      it('returns merged configuration from specific file without changed devtools rule ' +
        'and with production mode', () => {
        // given
        const expectedConfig:Configuration = {
          devtool: 'eval',
          entry: LIBRARY_INPUT_PATH,
          mode: 'production',
          module: { rules },
          optimization: {
            runtimeChunk: false,
            splitChunks: false,
          },
          output: {
            filename: LIBRARY_OUTPUT_FILENAME,
            libraryTarget: 'commonjs',
            path: resolve(projectRoot, `./${TEMP_DIR_NAME}`),
            publicPath: '/assets/',
          },
          plugins: [],
          resolve: {
            alias: {
              '@shopify/polaris': resolve(projectRoot, '..', 'src'),
            },
            extensions: ['.ts', '.tsx', '.js', '.json', '.js', '.jsx'],
          },
          target: 'web',
        };

        // when
        const config:Configuration = getConfig(projectRoot, webpackConfigPath, false);

        // then
        expect(config).toEqual(expectedConfig);
      });
    });
  });

  describe('when webpack config is not defined', () => {
    describe('and is development mode', () => {
      it('returns defined configuration with \'cheap-module-eval-source-map\' devtool and development mode', () => {
        // given
        const expectedConfig:Configuration = {
          devtool: 'cheap-module-eval-source-map',
          entry: LIBRARY_INPUT_PATH,
          mode: 'development',
          optimization: {
            runtimeChunk: false,
            splitChunks: false,
          },
          output: {
            filename: LIBRARY_OUTPUT_FILENAME,
            libraryTarget: 'commonjs',
            path: resolve(projectRoot, `./${TEMP_DIR_NAME}`),
          },
          resolve: {
            extensions: ['.js', '.jsx'],
          },
        };

        // when
        const config:Configuration = getConfig(projectRoot, undefined, true);

        // then
        expect(config).toEqual(expectedConfig);
      });
    });

    describe('and is not development mode', () => {
      it('returns defined configuration with production mode and without devtool parameter', () => {
        // given
        const expectedConfig:Configuration = {
          entry: LIBRARY_INPUT_PATH,
          mode: 'production',
          optimization: {
            runtimeChunk: false,
            splitChunks: false,
          },
          output: {
            filename: LIBRARY_OUTPUT_FILENAME,
            libraryTarget: 'commonjs',
            path: resolve(projectRoot, `./${TEMP_DIR_NAME}`),
          },
          resolve: {
            extensions: ['.js', '.jsx'],
          },
        };

        // when
        const config:Configuration = getConfig(projectRoot, undefined, false);

        // then
        expect(config).toEqual(expectedConfig);
      });
    });
  });
});
