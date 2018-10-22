import { BuildOptions } from '../../../steps/building/BuildOptions';
import { getLibraryBundleFilePath } from '../../../steps/building/library/getLibraryBundleFilePath';
import { getProjectEPID } from '../../../steps/experimentation/epid/getProjectEPID';
import { thunkCreateEPID } from '../../../steps/experimentation/epid/thunkCreateEPID';
import {
  ExperimentMetadataOptions,
  thunkSaveMetadataLibrary,
} from '../../../steps/experimentation/metadata/saveMetadata';
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
    { exec: thunkSaveMetadataLibrary(getMetadataOptions(args)), shouldRun: true },
    { exec: thunkCreateEPID(getBuildOptions(args)), shouldRun: true },
    { exec: thunkStartExperimentationServer(args), shouldRun: true },
  ];
}

function thunkStartExperimentationServer(args:ExperimentProgramArgs):(ds:DSMetadata) => Promise<any> {
  return async () => {
    return startExperimentationServer(await getExperimentServerOptions(args));
  };
}

function getBuildOptions(args:ExperimentProgramArgs):BuildOptions {
  const { webpackConfig, wrapper } = args;
  return {
    development: true,
    projectRoot: getProjectRoot(args),
    uxpinDirPath: getTempDirPath(args),
    webpackConfigPath: webpackConfig,
    wrapperPath: wrapper,
  };
}

function getMetadataOptions(args:ExperimentProgramArgs):ExperimentMetadataOptions {
  return {
    uxpinDirPath: getTempDirPath(args),
  };
}

async function getExperimentServerOptions(args:ExperimentProgramArgs):Promise<ExperimentationServerOptions> {
  const { port, uxpinDomain } = args;
  const uxpinDirPath:string = getTempDirPath(args);
  const projectRoot:string = getProjectRoot(args);
  return {
    bundlePath: getLibraryBundleFilePath(uxpinDirPath),
    epid: await getProjectEPID(projectRoot),
    port,
    projectRoot,
    uxpinDirPath,
    uxpinDomain,
  };
}
