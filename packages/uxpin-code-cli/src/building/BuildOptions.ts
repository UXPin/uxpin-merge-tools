import { LibraryTarget } from './config/LibraryTarget';

export interface BuildOptions {
  target?:LibraryTarget;
  webpackConfigPath?:string;
  wrapperPath?:string;
}
