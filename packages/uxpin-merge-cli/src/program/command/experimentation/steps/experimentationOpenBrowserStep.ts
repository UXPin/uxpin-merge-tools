import { getAPPExperimentationRemoteURL } from '../../../../steps/experimentation/app/getAPPExperimentationRemoteURL';
import { openUserBrowserOnSpecificUrl } from '../../../../utils/browser/openUserBrowserOnSpecificUrl';
import { ExperimentProgramArgs } from '../../../args/ProgramArgs';
import { Step } from '../../Step';
import { getExperimentServerOptions } from './common/getExperimentServerOptions';

export function experimentationOpenBrowserStep(args:ExperimentProgramArgs):Step {
  return {
    exec: async () => {
      const appURL:string = getAPPExperimentationRemoteURL(await getExperimentServerOptions(args));
      return openUserBrowserOnSpecificUrl(appURL);
    },
    shouldRun: !args.skipBrowser,
  };
}
