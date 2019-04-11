import { ExperimentProgramArgs } from '../../../../program/args/ProgramArgs';
import { DSMetadata } from '../../../../program/DSMeta';
import { isTestEnv } from '../../../../program/env/isTestEnv';
import { Store } from '../../../../utils/store/Store';
import { Step, StepExecutor } from '../../Step';
import { ExperimentationState } from '../getExperimentationCommandSteps';

export function experimentationRunNgrok(args:ExperimentProgramArgs, store:Store<ExperimentationState>):Step {
  return { exec: startNgrok(args, store), shouldRun: !args.disableTunneling };
}

const TEST_SESSION_ID:string = 'https://sessionId.ngrok.io';

function startNgrok(args:ExperimentProgramArgs, store:Store<ExperimentationState>):StepExecutor {
  return async (ds:DSMetadata) => {
    let url:string;

    // Import ngrok only in production environment because of request-promise, ngrok and jest clash
    // https://github.com/request/request-promise/issues/247
    if (isTestEnv()) {
      url = TEST_SESSION_ID;
    } else {
      // tslint:disable-next-line:typedef
      const ngrok = require('ngrok');
      url = await ngrok.connect(args.port);
    }

    store.setState({
      ngrokUrl: url,
    });

    return ds;
  };
}
