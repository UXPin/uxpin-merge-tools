import { CommanderStatic } from 'commander';
import { Command } from '../..';

export interface RawProgramArgs {
  args?:Arg[];
  config?:string;
  cwd:string;
  port?:number;
  webpackConfig?:string;
  wrapper?:string;
}

export interface ConfigEnabledProgramArgs {
  webpackConfig?:string;
  wrapper?:string;
  uxpinDomain?:string;
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
  token?:string;
  uxpinDomain?:string;
  webpackConfig?:string;
  wrapper?:string;

  // Branch name to use as an override (normally for detached head state)
  // https://github.com/UXPin/uxpin-merge-tools/issues/206
  branch?:string;

  storybook?:boolean;
}

export interface ServerProgramArgs {
  command:Command.SERVER;
  cwd:string;
  port:number;
  webpackConfig?:string;
  wrapper?:string;
  config:string;

  storybook?:boolean;
}

export interface DumpProgramArgs {
  command:Command.DUMP;
  cwd:string;
  config:string;

  storybook?:boolean;
}

export interface SummaryProgramArgs {
  command:Command.SUMMARY;
  cwd:string;
  config:string;

  storybook?:boolean;
}

export interface ExperimentProgramArgs {
  command:Command.EXPERIMENT;
  config:string;
  cwd:string;
  disableTunneling?:boolean;
  port:number;
  webpackConfig?:string;
  wrapper?:string;
  uxpinDomain:string;
  skipBrowser:boolean;

  storybook?:boolean;
}

export type Arg = string | CommanderStatic;
