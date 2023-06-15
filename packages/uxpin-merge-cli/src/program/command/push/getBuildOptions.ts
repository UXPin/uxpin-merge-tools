import { getDefaultApiDomain } from '../../../../src/common/services/UXPin/getDefaultApiDomain';
import { BuildOptions } from '../../../steps/building/BuildOptions';
import { PushProgramArgs } from '../../args/ProgramArgs';
import { getProjectRoot } from '../../args/providers/paths/getProjectRoot';
import { getTempDirPath } from '../../args/providers/paths/getTempDirPath';
import { Command } from '../Command';

export function getBuildOptions(args: BuildProgramArgs): BuildOptions {
  const { command, token, uxpinDomain, webpackConfig, wrapper, branch, tag, force } = args;

  return {
    command,
    branch,
    projectRoot: getProjectRoot(args),
    tag,
    force,
    token,
    uxpinApiDomain: getDefaultApiDomain(uxpinDomain!),
    uxpinDirPath: getTempDirPath(args),
    uxpinDomain,
    webpackConfigPath: webpackConfig,
    wrapperPath: wrapper,
  };
}

export interface BuildProgramArgs {
  command: Command;
  config?: string;
  cwd: string;
  force?: boolean;
  token?: string;
  uxpinDomain?: string;
  webpackConfig?: string;
  wrapper?: string;
  branch?: string;
  tag?: string;
}
