import { BuildOptions } from '../../../steps/building/BuildOptions';
import { getLibraryBundleFilePath } from '../../../steps/building/library/getLibraryBundleFilePath';
import {
  ExperimentationServerOptions,
  startExperimentationServer,
} from '../../../steps/experimentation/server/startExperimentationServer';
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
    return startExperimentationServer(getExperimentServerOptions(args));
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

function getExperimentServerOptions(args:ExperimentProgramArgs):ExperimentationServerOptions {
  const { port, uxpinDomain } = args;
  const uxpinDirPath:string = getTempDirPath(args);
  return {
    bundlePath: getLibraryBundleFilePath(uxpinDirPath),
    port,
    projectRoot: getProjectRoot(args),
    uxpinDirPath,
    uxpinDomain,
  };
}
