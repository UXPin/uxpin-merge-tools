import { Configuration } from 'webpack';

export interface BuildOptions {
  development?:boolean;
  projectRoot:string;
  token?:string;
  uxpinDirPath:string;
  uxpinApiDomain?:string;
  uxpinDomain?:string;
  webpackConfigPath?:string;
  wrapperPath?:string;
  branch?:string;
  storybook?:boolean;
  storybookWebpackConfig?:Configuration;
}
