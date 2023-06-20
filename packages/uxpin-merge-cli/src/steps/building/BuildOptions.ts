import { Command } from '../../program/command/Command';

export interface BuildOptions {
  command: Command;
  development?: boolean;
  projectRoot: string;
  token?: string;
  uxpinDirPath: string;
  uxpinApiDomain?: string;
  uxpinDomain?: string;
  webpackConfigPath?: string;
  wrapperPath?: string;
  branch?: string;
  tag?: string;
  force?: boolean;
}
