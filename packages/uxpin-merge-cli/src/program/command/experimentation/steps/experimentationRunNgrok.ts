import { ExperimentProgramArgs } from '../../../../program/args/ProgramArgs';
import { DSMetadata } from '../../../../program/DSMeta';
import { isTestEnv } from '../../../../program/env/isTestEnv';
import { Store } from '../../../../utils/store/Store';
import { Step, StepExecutor } from '../../Step';
import { ExperimentationState } from '../getExperimentationCommandSteps';
import { printWarning } from '../../../../utils/console/printLine';

export function experimentationRunNgrok(args: ExperimentProgramArgs, store: Store<ExperimentationState>): Step {
  return { exec: startNgrok(args, store), shouldRun: !args.disableTunneling };
}

const TEST_SESSION_ID = 'https://sessionId.ngrok.io';

function startNgrok(args: ExperimentProgramArgs, store: Store<ExperimentationState>): StepExecutor {
  return async (ds: DSMetadata) => {
    let url: string;

    // Import ngrok only in production environment because of request-promise, ngrok and jest clash
    // https://github.com/request/request-promise/issues/247
    if (isTestEnv()) {
      url = TEST_SESSION_ID;
    } else {
      // tslint:disable-next-line:typedef
      let ngrok;

      try {
        ngrok = require('ngrok');
      } catch (e) {
        printWarning(`Failed to start tunnel. Install ngrok if you want to use tunneling.
You can install it with:
  npm install --save-dev ngrok
or
  yarn add --dev ngrok
Starting experimental mode without tunneling.  
        `);
        return ds;
      }

      if (ngrok) {
        try {
          url = await Promise.race([
            ngrok.connect(args.port),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000)),
          ]);
        } catch (e) {
          printWarning(`Failed to start tunnel. Starting experimental mode without tunneling.`);
          return ds;
        }
      } else {
        return ds;
      }
    }

    store.setState({
      ngrokUrl: url,
    });

    return ds;
  };
}
