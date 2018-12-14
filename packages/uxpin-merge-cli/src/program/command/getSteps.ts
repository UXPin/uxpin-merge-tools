import { ProgramArgs } from '../args/ProgramArgs';
import { Command } from './Command';
import { getDumpCommandSteps } from './dump/getDumpCommandSteps';
import { getExperimentationCommandSteps } from './experimentation/getExperimentationCommandSteps';
import { getPushCommandSteps } from './push/getPushCommandSteps';
import { getServerCommandSteps } from './server/getServerCommandSteps';
import { Step } from './Step';
import { getSummaryCommandSteps } from './summary/getSummaryCommandSteps';
import { getVersionCommandSteps } from './version/getVersionCommandSteps';

export function getSteps(args:ProgramArgs):Step[] {
  let steps:Step[] = [
    ...getVersionCommandSteps(),
  ];

  switch (args.command) {
    case Command.SERVER:
      return [
        ...steps,
        ...getServerCommandSteps(args),
      ];

    case Command.PUSH:
      return [
        ...steps,
        ...getPushCommandSteps(args),
      ];

    case Command.DUMP:
      return [
        ...steps,
        ...getDumpCommandSteps(),
      ];

    case Command.SUMMARY:
      return [
        ...steps,
        ...getSummaryCommandSteps(),
      ];

    case Command.EXPERIMENT:
      return [
        ...steps,
        ...getExperimentationCommandSteps(args),
      ];

    default:
      return steps;
  }
}
