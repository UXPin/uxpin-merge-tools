import * as ngrok from 'ngrok';
import { ExperimentProgramArgs } from '../../../../program/args/ProgramArgs';
import { DSMetadata } from '../../../../program/DSMeta';
import { Step } from '../../Step';

export function experimentationRunNgrok(args:ExperimentProgramArgs):Step {
  return { exec: startNgrok(args), shouldRun: true };
}

function startNgrok(args:ExperimentProgramArgs):(ds:DSMetadata) => Promise<any> {
  return async (ds:DSMetadata) => {
    const url = ngrok.connect(args.port);

    console.log('ngrok', url, args);

    return ds;
  }
}
