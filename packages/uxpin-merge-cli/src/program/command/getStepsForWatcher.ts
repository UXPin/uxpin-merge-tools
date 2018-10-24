import { ProgramArgs } from '../args/ProgramArgs';
import { getExperimentationWatchCommandSteps } from './experimentation/getExperimentationWatchCommandSteps';
import { Step } from './Step';

export function getStepsForWatcher(args:ProgramArgs):Step[] {
  if (args.command === 'experiment') {
    return getExperimentationWatchCommandSteps(args);
  }

  return [];
}
