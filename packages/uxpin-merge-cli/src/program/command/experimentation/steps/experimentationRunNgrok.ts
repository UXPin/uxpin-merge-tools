import * as ngrok from 'ngrok';
import { ExperimentProgramArgs } from '../../../../program/args/ProgramArgs';
import { DSMetadata } from '../../../../program/DSMeta';
import { isTestEnv } from '../../../../program/env/isTestEnv';
import { Store } from '../../../../program/utils/store/Store';
import { Step, StepExecutor } from '../../Step';
import { ExperimentationState } from '../getExperimentationCommandSteps';

export function experimentationRunNgrok(args:ExperimentProgramArgs, store:Store<ExperimentationState>):Step {
  return { exec: startNgrok(args, store), shouldRun: true };
}

const TEST_SESSION_ID:string = 'https://sessionId.ngrok.io';

function startNgrok(args:ExperimentProgramArgs, store:Store<ExperimentationState>):StepExecutor {
  return async (ds:DSMetadata) => {
    const url:string = isTestEnv()
      ? TEST_SESSION_ID
      : await ngrok.connect(args.port);

    store.setState({
      ngrokUrl: url,
    });

    return ds;
  };
}
