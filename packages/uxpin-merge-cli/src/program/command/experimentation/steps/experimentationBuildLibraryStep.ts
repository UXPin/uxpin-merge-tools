import { BuildOptions } from '../../../../steps/building/BuildOptions';
import { ExperimentProgramArgs } from '../../../args/ProgramArgs';
import { getProjectRoot } from '../../../args/providers/paths/getProjectRoot';
import { getTempDirPath } from '../../../args/providers/paths/getTempDirPath';
import { thunkBuildComponentsLibrary } from '../../../utils/thunkBuildComponentsLibrary';
import { Step } from '../../Step';

export function experimentationBuildLibraryStep(args: ExperimentProgramArgs): Step {
  return { exec: thunkBuildComponentsLibrary(getBuildOptions(args)), shouldRun: true };
}

export function getBuildOptions(args: ExperimentProgramArgs): BuildOptions {
  const { command, webpackConfig, wrapper } = args;
  return {
    command,
    development: true,
    projectRoot: getProjectRoot(args),
    uxpinDirPath: getTempDirPath(args),
    webpackConfigPath: webpackConfig,
    wrapperPath: wrapper,
  };
}
