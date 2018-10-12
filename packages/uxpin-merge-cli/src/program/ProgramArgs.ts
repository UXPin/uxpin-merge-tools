import { CommanderStatic } from 'commander';

export interface RawProgramArgs {
  args?:Arg[];
  cwd:string;
  port?:number;
  webpackConfig?:string;
  wrapper?:string;
  config?:string;
}

export type ProgramArgs = PushProgramArgs
  | ServerProgramArgs
  | DumpProgramArgs
  | SummaryProgramArgs
  | ExperimentProgramArgs;

export interface PushProgramArgs {
  command:'push';
  cwd:string;
  webpackConfig?:string;
  wrapper?:string;
  config:string;
}

export interface ServerProgramArgs {
  command:'server';
  cwd:string;
  port:number;
  webpackConfig?:string;
  wrapper?:string;
  config:string;
}

export interface DumpProgramArgs {
  command:'dump';
  cwd:string;
  webpackConfig?:string;
  wrapper?:string;
  config:string;
}

export interface SummaryProgramArgs {
  command:'summary';
  cwd:string;
  webpackConfig?:string;
  wrapper?:string;
  config:string;
}

export interface ExperimentProgramArgs {
  command:'experiment';
  cwd:string;
  port:number;
  webpackConfig?:string;
  wrapper?:string;
  config:string;
}

export type Arg = string | CommanderStatic;
