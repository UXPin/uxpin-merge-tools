import { CommanderStatic } from 'commander';
import { Command } from '../..';
import { FrameworkNames } from '../../framework/frameworkNames';

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
    | GeneratePresetsProgramArgs
    | ServerProgramArgs
    | SummaryProgramArgs;

export interface DumpProgramArgs {
  command:Command.DUMP;
  cwd:string;
  config:string;
  framework:FrameworkNames;
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
  framework:FrameworkNames;
}

export interface InitProgramArgs {
  command:Command.INIT;
  cwd:string;
  config:string;
  framework:FrameworkNames;
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
  framework:FrameworkNames;
}

export interface GeneratePresetsProgramArgs {
  command:Command.GENERATE_PRESETS;
  componentPath?:string;
  cwd:string;
  config?:string;
  framework:FrameworkNames;
}

export interface ServerProgramArgs {
  command:Command.SERVER;
  cwd:string;
  port:number;
  webpackConfig?:string;
  wrapper?:string;
  config:string;
  framework:FrameworkNames;
}

export interface SummaryProgramArgs {
  command:Command.SUMMARY;
  cwd:string;
  config:string;
  framework:FrameworkNames;
}

export type Arg = string | CommanderStatic;
