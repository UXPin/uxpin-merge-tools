import { BuildOptions } from '../../../steps/building/BuildOptions';
import { PushProgramArgs } from '../../args/ProgramArgs';
import { getProjectRoot } from '../../args/providers/paths/getProjectRoot';
import { getTempDirPath } from '../../args/providers/paths/getTempDirPath';

export function getBuildOptions(args:BuildProgramArgs):BuildOptions {
  const { webpackConfig, wrapper } = args;
  return {
    projectRoot: getProjectRoot(args),
    uxpinDirPath: getTempDirPath(args),
    webpackConfigPath: webpackConfig,
    wrapperPath: wrapper,
  };
}

export type BuildProgramArgs = Pick<PushProgramArgs, 'cwd' | 'webpackConfig' | 'wrapper'>;
