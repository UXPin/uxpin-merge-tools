import { BuildOptions } from '../../../steps/building/BuildOptions';
import { PushProgramArgs } from '../../ProgramArgs';

export function getBuildOptions(args:BuildProgramArgs):BuildOptions {
  const { cwd, webpackConfig, wrapper } = args;
  return {
    projectRoot: cwd,
    webpackConfigPath: webpackConfig,
    wrapperPath: wrapper,
  };
}

export type BuildProgramArgs = Pick<PushProgramArgs, 'cwd' | 'webpackConfig' | 'wrapper'>;
