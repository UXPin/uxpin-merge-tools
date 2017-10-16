import pReduce = require('p-reduce');

import { stringifyWarnings } from '../common/warning/stringifyWarnings';
import { startServer } from '../server/startServer';
import { buildDesignSystem } from '../steps/building/buildDesignSystem';
import { BuildOptions } from '../steps/building/BuildOptions';
import { ComponentInfo } from '../steps/discovery/component/ComponentInfo';
import { getDesignSystemComponentInfos } from '../steps/discovery/component/getDesignSystemComponentInfos';
import { getDesignSystemSummary } from '../steps/discovery/getDesignSystemSummary';
import { getDesignSystemMetadata } from '../steps/serialization/getDesignSystemMetadata';
import { printDump } from '../steps/serialization/printDump';
import { tapPromise } from '../utils/promise/tapPromise';
import { getProgramArgs } from './getProgramArgs';
import { ProgramArgs } from './ProgramArgs';

export function runProgram(program:ProgramArgs):Promise<any> {
  const { args, dump, summary, webpackConfig, wrapper, cwd } = getProgramArgs(program);
  const isServer:boolean = !!(args && args.find((arg) => typeof arg !== 'string' && arg.name() === 'server'));

  const buildOptions:BuildOptions = {
    projectRoot: cwd,
    webpackConfigPath: webpackConfig,
    wrapperPath: wrapper,
  };

  const steps:Step[] = [
    { exec: (infos) => buildDesignSystem(infos, buildOptions), shouldRun: !dump && !summary },
    { exec: printDump, shouldRun: dump && !isServer },
    { exec: printSummary, shouldRun: !dump && !isServer },
    { exec: printSerializationWarnings, shouldRun: !dump && !isServer },
    { exec: startServer, shouldRun: isServer },
  ];

  const stepFunctions:StepExecutor[] = steps.filter((step) => step.shouldRun).map((step) => tapPromise(step.exec));

  return getDesignSystemComponentInfos(cwd).then((infos:ComponentInfo[]) => {
    return pReduce(stepFunctions, (reduceInfos, step) => step(reduceInfos), infos);
  }).catch(logError);

}

function printSerializationWarnings(infos:ComponentInfo[]):Promise<any> {
  return getDesignSystemMetadata(infos).then(({ warnings }) => console.log(stringifyWarnings(warnings)));
}

function printSummary(infos:ComponentInfo[]):void {
  console.log(getDesignSystemSummary(infos));
}

function logError(errorMessage:string):void {
  console.log('ERROR:', errorMessage);
}

type StepExecutor = (infos:ComponentInfo[]) => Promise<ComponentInfo[]>;

interface Step {
  shouldRun:boolean;
  exec:(infos:ComponentInfo[]) => any;
}
