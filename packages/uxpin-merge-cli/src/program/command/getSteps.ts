import { BuildOptions } from '../../steps/building/BuildOptions';
import { ProgramArgs } from '../ProgramArgs';
import { getDumpCommandSteps } from './dump/getDumpCommandSteps';
import { getPushCommandSteps } from './push/getPushCommandSteps';
import { getServerCommandSteps } from './server/getServerCommandSteps';
import { Step } from './Step';
import { getSummaryCommandSteps } from './summary/getSummaryCommandSteps';

export function getSteps(args:ProgramArgs):Step[] {
  const { cwd, webpackConfig, wrapper } = args;
  const buildOptions:BuildOptions = {
    projectRoot: cwd,
    webpackConfigPath: webpackConfig,
    wrapperPath: wrapper,
  };

  if (args.command === 'server') {
    return getServerCommandSteps(buildOptions, args);
  }

  if (args.command === 'push') {
    return getPushCommandSteps(buildOptions);
  }

  if (args.command === 'dump') {
    return getDumpCommandSteps();
  }

  if (args.command === 'summary') {
    return getSummaryCommandSteps();
  }

  return [];
}
