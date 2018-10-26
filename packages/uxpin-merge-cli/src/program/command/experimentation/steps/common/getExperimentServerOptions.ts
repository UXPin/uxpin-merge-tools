import { getLibraryBundleFilePath } from '../../../../../steps/building/library/getLibraryBundleFilePath';
import { getProjectEPID } from '../../../../../steps/experimentation/epid/getProjectEPID';
import { ExperimentationServerOptions } from '../../../../../steps/experimentation/server/startExperimentationServer';
import { ExperimentProgramArgs } from '../../../../args/ProgramArgs';
import { getProjectRoot } from '../../../../args/providers/paths/getProjectRoot';
import { getTempDirPath } from '../../../../args/providers/paths/getTempDirPath';

export async function getExperimentServerOptions(args:ExperimentProgramArgs):Promise<ExperimentationServerOptions> {
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
