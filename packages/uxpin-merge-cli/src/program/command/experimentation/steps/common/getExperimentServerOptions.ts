import { getNgrokSessionId } from '../../../../../common/services/ngrok/getNgrokSessionId';
import { getLibraryBundleFilePath } from '../../../../../steps/building/library/getLibraryBundleFilePath';
import { getEPIDFilePath } from '../../../../../steps/experimentation/epid/getEPIDFilePath';
import { getProjectEPID } from '../../../../../steps/experimentation/epid/getProjectEPID';
import { ExperimentationServerOptions } from '../../../../../steps/experimentation/server/startExperimentationServer';
import { ExperimentProgramArgs } from '../../../../args/ProgramArgs';
import { getProjectRoot } from '../../../../args/providers/paths/getProjectRoot';
import { getTempDirPath } from '../../../../args/providers/paths/getTempDirPath';
import { ExperimentationState } from '../../getExperimentationCommandSteps';

export async function getExperimentServerOptions(
  args:ExperimentProgramArgs,
  state:ExperimentationState,
):Promise<ExperimentationServerOptions> {
  const { port, uxpinDomain, skipBrowser } = args;
  const uxpinDirPath:string = getTempDirPath(args);
  const projectRoot:string = getProjectRoot(args);
  const ngrokSessionId:string|null = getNgrokSessionId(state.ngrokUrl!);

  return {
    bundlePath: getLibraryBundleFilePath(uxpinDirPath),
    epid: await getProjectEPID(getEPIDFilePath(projectRoot)),
    ngrokSessionId,
    port,
    projectRoot,
    skipBrowser,
    uxpinDirPath,
    uxpinDomain,
  };
}
