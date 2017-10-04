import { LibraryTarget } from '../steps/building/config/LibraryTarget';

export interface ProgramArgs {
  dump:boolean;
  summary:boolean;
  target:LibraryTarget;
  webpackConfig:string;
  wrapper:string;
}
