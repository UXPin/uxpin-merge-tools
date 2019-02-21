import { startExperimentationServer } from '../../../../steps/experimentation/server/startExperimentationServer';
import { Store } from '../../../../utils/store/Store';
import { ExperimentProgramArgs } from '../../../args/ProgramArgs';
import { DSMetadata } from '../../../DSMeta';
import { Step, StepExecutor } from '../../Step';
import { ExperimentationState } from '../getExperimentationCommandSteps';
import { getExperimentServerOptions } from './common/getExperimentServerOptions';

export function experimentationRunServerStep(args:ExperimentProgramArgs, store:Store<ExperimentationState>):Step {
  return { exec: thunkStartExperimentationServer(args, store), shouldRun: true };
}

function thunkStartExperimentationServer(args:ExperimentProgramArgs, store:Store<ExperimentationState>):StepExecutor {
  return async (ds:DSMetadata) => {
    if (store.state.ngrokUrl === null) {
      return ds;
    }

    startExperimentationServer(await getExperimentServerOptions(args, store.state));

    return ds;
  };
}
