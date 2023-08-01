import { Command } from '../../program/command/Command';

export interface BuildOptions {
  command: Command;
  branch?: string;
  development?: boolean;
  force?: boolean;
  pageHeadTags?: string[];
  projectRoot: string;
  tag?: string;
  token?: string;
  uxpinDirPath: string;
  uxpinApiDomain?: string;
  uxpinDomain?: string;
  webpackConfigPath?: string;
  wrapperPath?: string;
}
