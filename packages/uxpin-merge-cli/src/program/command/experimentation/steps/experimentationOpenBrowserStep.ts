import { Store } from '../../../../program/utils/store/Store';
import { getAPPExperimentationRemoteURL } from '../../../../steps/experimentation/app/getAPPExperimentationRemoteURL';
import { openUserBrowserOnSpecificUrl } from '../../../../utils/browser/openUserBrowserOnSpecificUrl';
import { ExperimentProgramArgs } from '../../../args/ProgramArgs';
import { Step, StepExecutor } from '../../Step';
import { ExperimentationState } from '../getExperimentationCommandSteps';
import { getExperimentServerOptions } from './common/getExperimentServerOptions';
import { DSMetadata } from '../../../../program/DSMeta';

export function experimentationOpenBrowserStep(args:ExperimentProgramArgs, store:Store<ExperimentationState>):Step {
  return { exec: openBrowser(args, store), shouldRun: !args.skipBrowser };
}

function openBrowser(args:ExperimentProgramArgs, store:Store<ExperimentationState>):StepExecutor {
  return async (ds:DSMetadata) => {
    if (store.state.ngrokUrl === null) {
      return ds;
    }

    const appURL:string = getAPPExperimentationRemoteURL(await getExperimentServerOptions(args, store.state));
    await openUserBrowserOnSpecificUrl(appURL);

    return ds;
  };
}
