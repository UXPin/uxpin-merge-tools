import { BuildOptions } from '../../../steps/building/BuildOptions';
import { PushProgramArgs } from '../../args/ProgramArgs';
import { getProjectRoot } from '../../args/providers/paths/getProjectRoot';
import { getTempDirPath } from '../../args/providers/paths/getTempDirPath';

function getDefaultApiDomain(domain:string):string {
  return `api.${domain}`;
}

export function getBuildOptions(args:BuildProgramArgs):BuildOptions {
  const { token, uxpinApiDomain, uxpinDomain, webpackConfig, wrapper } = args;

  return {
    projectRoot: getProjectRoot(args),
    token,
    uxpinApiDomain: uxpinApiDomain ? uxpinApiDomain : getDefaultApiDomain(uxpinDomain!),
    uxpinDirPath: getTempDirPath(args),
    uxpinDomain,
    webpackConfigPath: webpackConfig,
    wrapperPath: wrapper,
  };
}

export type BuildProgramArgs = Pick<PushProgramArgs, 'cwd' | 'token'
  | 'uxpinApiDomain' | 'uxpinDomain' | 'webpackConfig' | 'wrapper'>;
