import { getDefaultApiDomain } from '../../../../src/common/services/UXPin/getDefaultApiDomain';
import { BuildOptions } from '../../../steps/building/BuildOptions';
import { getProjectRoot } from '../../args/providers/paths/getProjectRoot';
import { getTempDirPath } from '../../args/providers/paths/getTempDirPath';
import { Command } from '../Command';

export function getBuildOptions(args: BuildProgramArgs): BuildOptions {
  const {
    command,
    pageHeadTags,
    token,
    uxpinDomain,
    webpackConfig,
    wrapper,
    branch,
    tag,
    force,
    disableVersionControl,
    cssResources,
  } = args;

  return {
    branch,
    command,
    force,
    pageHeadTags,
    cssResources,
    disableVersionControl,
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
  pageHeadTags?: string[];
  tag?: string;
  token?: string;
  uxpinDomain?: string;
  webpackConfig?: string;
  wrapper?: string;
  cssResources?: string;
  disableVersionControl?: boolean;
}
