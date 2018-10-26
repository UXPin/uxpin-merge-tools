import { startExperimentationServer } from '../../../../steps/experimentation/server/startExperimentationServer';
import { ExperimentProgramArgs } from '../../../args/ProgramArgs';
import { DSMetadata } from '../../../DSMeta';
import { Step } from '../../Step';
import { getExperimentServerOptions } from './common/getExperimentServerOptions';

export function experimentationRunServerStep(args:ExperimentProgramArgs):Step {
  return { exec: thunkStartExperimentationServer(args), shouldRun: true };
}

function thunkStartExperimentationServer(args:ExperimentProgramArgs):(ds:DSMetadata) => Promise<any> {
  return async () => {
    return startExperimentationServer(await getExperimentServerOptions(args));
  };
}
