import { BuildOptions } from '../../../steps/building/BuildOptions';
import { startExperimentationServer } from '../../../steps/experimentation/server/startExperimentationServer';
import { ExperimentProgramArgs } from '../../args/ProgramArgs';
import { getProjectRoot } from '../../args/providers/paths/getProjectRoot';
import { getTempDirPath } from '../../args/providers/paths/getTempDirPath';
import { DSMetadata } from '../../DSMeta';
import { thunkBuildComponentsLibrary } from '../../utils/thunkBuildComponentsLibrary';
import { Step } from '../Step';

export function getExperimentationServerCommandSteps(args:ExperimentProgramArgs):Step[] {
  return [
    { exec: thunkBuildComponentsLibrary(getBuildOptions(args)), shouldRun: true },
    { exec: thunkStartExperimentationServer(args), shouldRun: true },
  ];
}

function thunkStartExperimentationServer(args:ExperimentProgramArgs):(ds:DSMetadata) => Promise<any> {
  return () => {
    const { port, uxpinDomain } = args;
    return startExperimentationServer({
      port,
      projectRoot: getProjectRoot(args),
      uxpinDirPath: getTempDirPath(args),
      uxpinDomain,
    });
  };
}

function getBuildOptions(args:ExperimentProgramArgs):BuildOptions {
  const { webpackConfig, wrapper } = args;
  return {
    development: true,
    projectRoot: getProjectRoot(args),
    webpackConfigPath: webpackConfig,
    wrapperPath: wrapper,
  };
}
