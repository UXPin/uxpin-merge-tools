import { Compiler, Configuration } from 'webpack';

export function getStorybookWebpack(config:Configuration):Compiler {
  // @ts-ignore
  // By using webpack from storybook, we don't have to worry about version difference
  const pathToStorybookWebpack:string = require.resolve('webpack', { paths: ['./node_modules/@storybook/core'] });
  const storybookWebpack:any = require(pathToStorybookWebpack);
  return storybookWebpack(config);
}
