import { getDefaultApiDomain } from '../../../../src/common/services/UXPin/getDefaultApiDomain';
import { BuildOptions } from '../../../steps/building/BuildOptions';
import { PushProgramArgs } from '../../args/ProgramArgs';
import { getProjectRoot } from '../../args/providers/paths/getProjectRoot';
import { getTempDirPath } from '../../args/providers/paths/getTempDirPath';

export function getBuildOptions(args: BuildProgramArgs): BuildOptions {
  const { token, uxpinDomain, webpackConfig, wrapper, branch, tag } = args;

  return {
    branch,
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

export type BuildProgramArgs = Pick<
  PushProgramArgs,
  'cwd' | 'token' | 'uxpinDomain' | 'webpackConfig' | 'wrapper' | 'branch' | 'tag'
>;
