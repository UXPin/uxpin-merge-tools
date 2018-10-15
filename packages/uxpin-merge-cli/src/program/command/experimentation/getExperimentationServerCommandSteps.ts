import { startExperimentationServer } from '../../../steps/experimentation/server/startExperimentationServer';
import { ExperimentProgramArgs } from '../../args/ProgramArgs';
import { getTempDirPath } from '../../args/providers/paths/getTempDirPath';
import { DSMetadata } from '../../DSMeta';
import { Step } from '../Step';

export function getExperimentationServerCommandSteps(args:ExperimentProgramArgs):Step[] {
  return [
    { exec: thunkStartExperimentationServer(args), shouldRun: true },
  ];
}

function thunkStartExperimentationServer(args:ExperimentProgramArgs):(ds:DSMetadata) => Promise<any> {
  return () => {
    const { port, uxpinDomain } = args;
    return startExperimentationServer({
      port,
      uxpinDirPath: getTempDirPath(args),
      uxpinDomain,
    });
  };
}
