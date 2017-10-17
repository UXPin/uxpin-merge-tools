import { CommanderStatic } from 'commander';

export interface RawProgramArgs {
  args?:Arg[];
  cwd:string;
  dump:boolean;
  summary:boolean;
  webpackConfig?:string;
  wrapper?:string;
}

export type ProgramArgs = DefaultProgramArgs | ServerProgramArgs;

export interface DefaultProgramArgs {
  command:'upload';
  cwd:string;
  dump:boolean;
  summary:boolean;
  webpackConfig?:string;
  wrapper?:string;
}

interface ServerProgramArgs {
  command:'server';
  cwd:string;
  webpackConfig?:string;
  wrapper?:string;
}

type Arg = string|CommanderStatic;
