import { CommanderStatic } from 'commander';
import { Command } from '../..';

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
  command:Command.PUSH;
  cwd:string;
  webpackConfig?:string;
  wrapper?:string;
  config:string;
}

export interface ServerProgramArgs {
  command:Command.SERVER;
  cwd:string;
  port:number;
  webpackConfig?:string;
  wrapper?:string;
  config:string;
}

export interface DumpProgramArgs {
  command:Command.DUMP;
  cwd:string;
  config:string;
}

export interface SummaryProgramArgs {
  command:Command.SUMMARY;
  cwd:string;
  config:string;
}

export interface ExperimentProgramArgs {
  command:Command.EXPERIMENT;
  config:string;
  cwd:string;
  port:number;
  webpackConfig?:string;
  wrapper?:string;
  uxpinDomain:string;
  skipBrowser:boolean;
}

export type Arg = string | CommanderStatic;
