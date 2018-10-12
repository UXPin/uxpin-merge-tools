import { CommanderStatic } from 'commander';

export interface RawProgramArgs {
  args?:Arg[];
  cwd:string;
  dump:boolean;
  port?:number;
  summary:boolean;
  webpackConfig?:string;
  wrapper?:string;
  config?:string;
}

export type ProgramArgs = PushProgramArgs | ServerProgramArgs | ExperimentProgramArgs;

export interface PushProgramArgs {
  command:'push';
  cwd:string;
  dump:boolean;
  summary:boolean;
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

export interface ExperimentProgramArgs {
  command:'experiment';
  cwd:string;
  port:number;
  webpackConfig?:string;
  wrapper?:string;
  config:string;
}

export type Arg = string|CommanderStatic;
