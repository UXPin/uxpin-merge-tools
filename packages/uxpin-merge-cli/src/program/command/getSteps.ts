import { ProgramArgs } from '../args/ProgramArgs';
import { getDumpCommandSteps } from './dump/getDumpCommandSteps';
import { getExperimentationCommandSteps } from './experimentation/getExperimentationCommandSteps';
import { getPushCommandSteps } from './push/getPushCommandSteps';
import { getServerCommandSteps } from './server/getServerCommandSteps';
import { Step } from './Step';
import { getSummaryCommandSteps } from './summary/getSummaryCommandSteps';

export function getSteps(args:ProgramArgs):Step[] {
  switch (args.command) {
    case 'server':
      return getServerCommandSteps(args);

    case 'push':
      return getPushCommandSteps(args);

    case 'dump':
      return getDumpCommandSteps();

    case 'summary':
      return getSummaryCommandSteps();

    case 'experiment':
      return getExperimentationCommandSteps(args);

    default:
      return [];
  }
}
