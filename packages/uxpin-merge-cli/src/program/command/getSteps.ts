import { BuildOptions } from '../../steps/building/BuildOptions';
import { ProgramArgs, PushProgramArgs, ServerProgramArgs } from '../ProgramArgs';
import { getDumpCommandSteps } from './dump/getDumpCommandSteps';
import { getPushCommandSteps } from './push/getPushCommandSteps';
import { getServerCommandSteps } from './server/getServerCommandSteps';
import { Step } from './Step';
import { getSummaryCommandSteps } from './summary/getSummaryCommandSteps';

export function getSteps(args:ProgramArgs):Step[] {
  if (args.command === 'server') {
    return getServerCommandSteps(getBuildOptions(args), args);
  }

  if (args.command === 'push') {
    return getPushCommandSteps(getBuildOptions(args));
  }

  if (args.command === 'dump') {
    return getDumpCommandSteps();
  }

  if (args.command === 'summary') {
    return getSummaryCommandSteps();
  }

  return [];
}

function getBuildOptions(args:ServerProgramArgs | PushProgramArgs):BuildOptions {
  const { cwd, webpackConfig, wrapper } = args;
  return {
    projectRoot: cwd,
    webpackConfigPath: webpackConfig,
    wrapperPath: wrapper,
  };
}
