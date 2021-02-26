import { ProgramArgs } from '../args/ProgramArgs';
import { Command } from './Command';
import { getDumpCommandSteps } from './dump/getDumpCommandSteps';
import { getExperimentationCommandSteps } from './experimentation/getExperimentationCommandSteps';
import { getInitCommandSteps } from './init/getInitCommandSteps';
import { getGeneratePresetsCommandSteps } from './generate_presets/getGeneratePresetsCommandSteps';
import { getPushCommandSteps } from './push/getPushCommandSteps';
import { getServerCommandSteps } from './server/getServerCommandSteps';
import { Step } from './Step';
import { getSummaryCommandSteps } from './summary/getSummaryCommandSteps';

export function getSteps(args:ProgramArgs):Step[] {
  switch (args.command) {
    case Command.DUMP:
      return getDumpCommandSteps();

    case Command.EXPERIMENT:
      return getExperimentationCommandSteps(args);

    case Command.INIT:
      return getInitCommandSteps(args);

    case Command.GENERATE_PRESETS:
      return getGeneratePresetsCommandSteps(args);

    case Command.PUSH:
      return getPushCommandSteps(args);

    case Command.SERVER:
      return getServerCommandSteps(args);

    case Command.SUMMARY:
      return getSummaryCommandSteps();

    default:
      return [];
  }
}