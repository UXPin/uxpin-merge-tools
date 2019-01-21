import { CommanderStatic } from 'commander';
import { Command } from '../..';

export interface RawProgramArgs {
  args?:Arg[];
  config?:string;
  cwd:string;
  dev?:boolean;
  port?:number;
  webpackConfig?:string;
  wrapper?:string;
}

export type ProgramArgs = PushProgramArgs
  | ServerProgramArgs
  | DumpProgramArgs
  | SummaryProgramArgs
  | ExperimentProgramArgs;

export interface PushProgramArgs {
  command:Command.PUSH;
  config:string;
  cwd:string;
  dev?:boolean;
  token?:string;
  uxpinApiDomain?:string;
  uxpinDomain?:string;
  webpackConfig?:string;
  wrapper?:string;
}

export interface ServerProgramArgs {
  command:Command.SERVER;
  cwd:string;
  dev?:boolean;
  port:number;
  webpackConfig?:string;
  wrapper?:string;
  config:string;
}

export interface DumpProgramArgs {
  command:Command.DUMP;
  cwd:string;
  config:string;
  dev?:boolean;
}

export interface SummaryProgramArgs {
  command:Command.SUMMARY;
  cwd:string;
  config:string;
  dev?:boolean;
}

export interface ExperimentProgramArgs {
  command:Command.EXPERIMENT;
  config:string;
  cwd:string;
  dev?:boolean;
  port:number;
  webpackConfig?:string;
  wrapper?:string;
  uxpinDomain:string;
  skipBrowser:boolean;
}

export type Arg = string | CommanderStatic;
