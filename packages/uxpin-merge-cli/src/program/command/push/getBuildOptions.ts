import { getDefaultApiDomain } from '../../../../src/common/services/UXPin/getDefaultApiDomain';
import { BuildOptions } from '../../../steps/building/BuildOptions';
import { getProjectRoot } from '../../args/providers/paths/getProjectRoot';
import { getTempDirPath } from '../../args/providers/paths/getTempDirPath';
import { Command } from '../Command';

export function getBuildOptions(args: BuildProgramArgs): BuildOptions {
  const { command, pageHeadContent, token, uxpinDomain, webpackConfig, wrapper, branch, tag, force } = args;

  return {
    branch,
    command,
    force,
    pageHeadContent,
    projectRoot: getProjectRoot(args),
    tag,
    token,
    uxpinApiDomain: getDefaultApiDomain(uxpinDomain!),
    uxpinDirPath: getTempDirPath(args),
    uxpinDomain,
    webpackConfigPath: webpackConfig,
    wrapperPath: wrapper,
  };
}

export interface BuildProgramArgs {
  branch?: string;
  command: Command;
  config?: string;
  cwd: string;
  force?: boolean;
  pageHeadContent?: string[];
  tag?: string;
  token?: string;
  uxpinDomain?: string;
  webpackConfig?: string;
  wrapper?: string;
}
