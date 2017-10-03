import pReduce = require('p-reduce');
import { stringifyWarnings } from '../common/warning/stringifyWarnings';
import { tapPromise } from '../utils/promise/tapPromise';
import { buildDesignSystem } from './building/buildDesignSystem';
import { BuildOptions } from './building/BuildOptions';
import { ComponentInfo } from './discovery/components/ComponentInfo';
import { getDesignSystemComponentInfos } from './discovery/components/getDesignSystemComponentInfos';
import { getDesignSystemSummary } from './discovery/getDesignSystemSummary';
import { ProgramArgs } from './ProgramArgs';
import { getDesignSystemMetadata } from './serialization/getDesignSystemMetadata';
import { printDump } from './serialization/printDump';

export function performSteps(args:ProgramArgs):Promise<any> {
  const { dump, summary, target, webpackConfig, wrapper } = args;
  const buildOptions:BuildOptions = { target, webpackConfigPath: webpackConfig, wrapperPath: wrapper };

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
