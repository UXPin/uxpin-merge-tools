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

export type ProgramArgs = DumpProgramArgs
    | ExperimentProgramArgs
    | InitProgramArgs
    | PushProgramArgs
    | DeleteVersionArgs
    | GeneratePresetsProgramArgs
    | ServerProgramArgs
    | SummaryProgramArgs;

export interface DumpProgramArgs {
  command:Command.DUMP;
  cwd:string;
  config:string;
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
}

export interface InitProgramArgs {
  command:Command.INIT;
  cwd:string;
  config:string;
}

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
  tag?:string;
}

export interface DeleteVersionArgs {
  command:Command.DELETE_VERSION;
  token?:string;
  uxpinDomain?:string;
  branch?:string,
  tag?:string,
}

export interface GeneratePresetsProgramArgs {
  command:Command.GENERATE_PRESETS;
  componentPath?:string;
  cwd:string;
  config?:string;
}

export interface ServerProgramArgs {
  command:Command.SERVER;
  cwd:string;
  port:number;
  webpackConfig?:string;
  wrapper?:string;
  config:string;
}

export interface SummaryProgramArgs {
  command:Command.SUMMARY;
  cwd:string;
  config:string;
}

export type Arg = string | CommanderStatic;
