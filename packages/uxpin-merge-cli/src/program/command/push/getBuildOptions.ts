import { getDefaultApiDomain } from '../../../../src/common/services/UXPin/getDefaultApiDomain';
import { BuildOptions } from '../../../steps/building/BuildOptions';
import { getProjectRoot } from '../../args/providers/paths/getProjectRoot';
import { getTempDirPath } from '../../args/providers/paths/getTempDirPath';
import { Command } from '../Command';
import { ProvidedRevision } from '../../../steps/serialization/vcs/repositories/provided/ProvidedRepositoryAdapter';

export function getBuildOptions(args: BuildProgramArgs): BuildOptions {
  const { command, pageHeadTags, token, uxpinDomain, webpackConfig, wrapper, branch, tag, force, revision } = args;

  return {
    branch,
    command,
    force,
    revision,
    pageHeadTags,
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
  revision?: ProvidedRevision;
  config?: string;
  cwd: string;
  force?: boolean;
  pageHeadTags?: string[];
  tag?: string;
  token?: string;
  uxpinDomain?: string;
  webpackConfig?: string;
  wrapper?: string;
}
