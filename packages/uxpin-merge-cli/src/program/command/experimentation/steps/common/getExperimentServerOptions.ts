import { getLibraryBundleFilePath } from '../../../../../steps/building/library/getLibraryBundleFilePath';
import { getProjectEPID } from '../../../../../steps/experimentation/epid/getProjectEPID';
import { ExperimentationServerOptions } from '../../../../../steps/experimentation/server/startExperimentationServer';
import { ExperimentProgramArgs } from '../../../../args/ProgramArgs';
import { getProjectRoot } from '../../../../args/providers/paths/getProjectRoot';
import { getTempDirPath } from '../../../../args/providers/paths/getTempDirPath';
import { ExperimentationState } from '../../getExperimentationCommandSteps';
import { getNgrokSessionId } from '../../../../../common/services/ngrok/getNgrokSessionId';

export async function getExperimentServerOptions(args:ExperimentProgramArgs, state:ExperimentationState):Promise<ExperimentationServerOptions> {
  const { port, uxpinDomain, skipBrowser } = args;
  const uxpinDirPath:string = getTempDirPath(args);
  const projectRoot:string = getProjectRoot(args);
  const ngrokSessionId:string|null = getNgrokSessionId(state.ngrokUrl!);

  if (!ngrokSessionId) {
    throw new Error('Unknown ngrokSessionId');
  }

  return {
    bundlePath: getLibraryBundleFilePath(uxpinDirPath),
    epid: await getProjectEPID(projectRoot),
    ngrokSessionId,
    port,
    projectRoot,
    skipBrowser,
    uxpinDirPath,
    uxpinDomain,
  };
}
