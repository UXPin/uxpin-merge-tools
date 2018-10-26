import { getLibraryBundleFilePath } from '../../../../steps/building/library/getLibraryBundleFilePath';
import { getProjectEPID } from '../../../../steps/experimentation/epid/getProjectEPID';
import {
  ExperimentationServerOptions,
  startExperimentationServer,
} from '../../../../steps/experimentation/server/startExperimentationServer';
import { ExperimentProgramArgs } from '../../../args/ProgramArgs';
import { getProjectRoot } from '../../../args/providers/paths/getProjectRoot';
import { getTempDirPath } from '../../../args/providers/paths/getTempDirPath';
import { DSMetadata } from '../../../DSMeta';
import { Step } from '../../Step';

export function experimentationRunServerStep(args:ExperimentProgramArgs):Step {
  return { exec: thunkStartExperimentationServer(args), shouldRun: true };
}

function thunkStartExperimentationServer(args:ExperimentProgramArgs):(ds:DSMetadata) => Promise<any> {
  return async () => {
    return startExperimentationServer(await getExperimentServerOptions(args));
  };
}

async function getExperimentServerOptions(args:ExperimentProgramArgs):Promise<ExperimentationServerOptions> {
  const { port, uxpinDomain, skipBrowser } = args;
  const uxpinDirPath:string = getTempDirPath(args);
  const projectRoot:string = getProjectRoot(args);
  return {
    bundlePath: getLibraryBundleFilePath(uxpinDirPath),
    epid: await getProjectEPID(projectRoot),
    port,
    projectRoot,
    skipBrowser,
    uxpinDirPath,
    uxpinDomain,
  };
}
