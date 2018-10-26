import { getAPPExperimentationRemoteURL } from '../../../../steps/experimentation/app/getAPPExperimentationRemoteURL';
import { ExperimentProgramArgs } from '../../../args/ProgramArgs';
import { Step } from '../../Step';
import { getExperimentServerOptions } from './common/getExperimentServerOptions';

export function experimentationOpenBrowserStep(args:ExperimentProgramArgs):Step {
  return {
    exec: async () => {
      return getAPPExperimentationRemoteURL(await getExperimentServerOptions(args));
    },
    shouldRun: !args.skipBrowser,
  };
}
