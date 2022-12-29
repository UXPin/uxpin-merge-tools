import { join, resolve } from 'path';
import { Configuration, RuleSetRule } from 'webpack';
import { BuildOptions } from '../../BuildOptions';
import { getConfig, LIBRARY_INPUT_FILENAME, LIBRARY_OUTPUT_FILENAME, TEMP_DIR_NAME } from '../getConfig';

describe('getConfig', () => {
  const projectRoot: string = resolve(__dirname, '../../../../../test/resources/configs/');
  const entryPath: string = join(projectRoot, TEMP_DIR_NAME, LIBRARY_INPUT_FILENAME);

  describe('when webpack config is defined', () => {
    const webpackConfigPath = './getconfig-webpack.config.js';
    let rules: RuleSetRule[];

    beforeEach(() => {
      rules = [
        {
          test: expect.any(Function),
          use: [{ loader: '@shopify/images/icon-loader' }, { loader: 'image-webpack-loader' }],
        },
        {
          test: expect.any(Function),
          use: [
            {
              loader: 'url-loader',
              options: {
                emitFile: true,
                limit: 10000,
              },
            },
          ],
        },
      ];
    });

    describe('and is development mode', () => {
      it(
        "returns merged configuration from specific file with 'hidden-source-map devtool " +
          'and with development mod',
        () => {
          // given
          const expectedConfig: Configuration = {
            devtool: 'hidden-source-map',
            entry: entryPath,
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
          const options: BuildOptions = {
            development: true,
            projectRoot,
            uxpinDirPath: `${projectRoot}/${TEMP_DIR_NAME}`,
            webpackConfigPath,
          };

          // when
          const config: Configuration = getConfig(options);

          // then
          expect(config).toEqual(expectedConfig);
        }
      );
    });

    describe('and is not development mode', () => {
      it(
        'returns merged configuration from specific file without changed devtools rule ' + 'and with production mode',
        () => {
          // given
          const expectedConfig: Configuration = {
            devtool: 'eval-source-map',
            entry: entryPath,
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
          const options: BuildOptions = {
            development: false,
            projectRoot,
            uxpinDirPath: `${projectRoot}/${TEMP_DIR_NAME}`,
            webpackConfigPath,
          };

          // when
          const config: Configuration = getConfig(options);

          // then
          expect(config).toEqual(expectedConfig);
        }
      );
    });
  });

  describe('when webpack config is not defined', () => {
    describe('and is development mode', () => {
      it("returns defined configuration with 'hidden-source-map' devtool and development mode", () => {
        // given
        const expectedConfig: Configuration = {
          devtool: 'hidden-source-map',
          entry: entryPath,
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
        const options: BuildOptions = {
          development: true,
          projectRoot,
          uxpinDirPath: `${projectRoot}/${TEMP_DIR_NAME}`,
        };

        // when
        const config: Configuration = getConfig(options);

        // then
        expect(config).toEqual(expectedConfig);
      });
    });

    describe('and is not development mode', () => {
      it('returns defined configuration with production mode and without devtool parameter', () => {
        // given
        const expectedConfig: Configuration = {
          entry: entryPath,
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
        const options: BuildOptions = {
          development: false,
          projectRoot,
          uxpinDirPath: `${projectRoot}/${TEMP_DIR_NAME}`,
        };

        // when
        const config: Configuration = getConfig(options);

        // then
        expect(config).toEqual(expectedConfig);
      });
    });
  });
});
