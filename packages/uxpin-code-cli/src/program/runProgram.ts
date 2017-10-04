import pReduce = require('p-reduce');
import { stringifyWarnings } from '../common/warning/stringifyWarnings';
import { buildDesignSystem } from '../steps/building/buildDesignSystem';
import { BuildOptions } from '../steps/building/BuildOptions';
import { ComponentInfo } from '../steps/discovery/component/ComponentInfo';
import { getDesignSystemComponentInfos } from '../steps/discovery/component/getDesignSystemComponentInfos';
import { getDesignSystemSummary } from '../steps/discovery/getDesignSystemSummary';
import { getDesignSystemMetadata } from '../steps/serialization/getDesignSystemMetadata';
import { printDump } from '../steps/serialization/printDump';
import { tapPromise } from '../utils/promise/tapPromise';
import { ProgramArgs } from './ProgramArgs';

export function runProgram(args:ProgramArgs):Promise<any> {
  const { dump, summary, webpackConfig, wrapper } = args;
  const buildOptions:BuildOptions = { webpackConfigPath: webpackConfig, wrapperPath: wrapper };

  const steps:Step[] = [
    { exec: (infos) => buildDesignSystem(infos, buildOptions), shouldRun: !dump && !summary },
    { exec: printDump, shouldRun: dump },
    { exec: printSummary, shouldRun: !dump },
    { exec: printSerializationWarnings, shouldRun: !dump },
  ];

  const stepFunctions:StepExecutor[] = steps.filter((step) => step.shouldRun).map((step) => tapPromise(step.exec));

  return getDesignSystemComponentInfos().then((infos:ComponentInfo[]) => {
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
