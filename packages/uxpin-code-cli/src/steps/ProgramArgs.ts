import { LibraryTarget } from './building/config/LibraryTarget';

export interface ProgramArgs {
  dump:boolean;
  summary:boolean;
  target:LibraryTarget;
  webpackConfig:string;
  wrapper:string;
}
