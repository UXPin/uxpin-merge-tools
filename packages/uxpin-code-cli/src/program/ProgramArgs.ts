import { CommanderStatic } from 'commander';

type Arg = string|CommanderStatic;

export interface ProgramArgs {
  args?:Arg[];
  cwd:string;
  dump:boolean;
  summary:boolean;
  webpackConfig?:string;
  wrapper?:string;
}
