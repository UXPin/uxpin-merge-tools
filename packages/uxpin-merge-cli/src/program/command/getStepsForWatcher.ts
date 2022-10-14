import { ProgramArgs } from '../args/ProgramArgs';
import { Command } from './Command';
import { getExperimentationWatchCommandSteps } from './experimentation/getExperimentationWatchCommandSteps';
import { Step } from './Step';

export function getStepsForWatcher(args: ProgramArgs): Step[] {
  if (args.command === Command.EXPERIMENT) {
    return getExperimentationWatchCommandSteps(args);
  }

  return [];
}
