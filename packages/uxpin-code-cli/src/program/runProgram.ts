import pReduce = require('p-reduce');
import * as stringifyObject from 'stringify-object';
import { stringifyWarnings } from '../common/warning/stringifyWarnings';
import { Warned } from '../common/warning/Warned';
import { buildDesignSystem } from '../steps/building/buildDesignSystem';
import { BuildOptions } from '../steps/building/BuildOptions';
import { getDesignSystemComponentInfos } from '../steps/discovery/component/getDesignSystemComponentInfos';
import { getDesignSystemSummary } from '../steps/discovery/getDesignSystemSummary';
import { DesignSystemDefinition } from '../steps/serialization/DesignSystemDefinition';
import { getDesignSystemMetadata } from '../steps/serialization/getDesignSystemMetadata';
import { tapPromise } from '../utils/promise/tapPromise';
import { getProgramArgs } from './getProgramArgs';
import { ProgramArgs } from './ProgramArgs';

export function runProgram(program:ProgramArgs):Promise<any> {
  const { dump, summary, webpackConfig, wrapper, cwd } = getProgramArgs(program);
  const buildOptions:BuildOptions = {
    projectRoot: cwd,
    webpackConfigPath: webpackConfig,
    wrapperPath: wrapper,
  };

  const steps:Step[] = [
    { exec: buildComponentsLibrary(buildOptions), shouldRun: !dump && !summary },
    { exec: printDump, shouldRun: dump },
    { exec: printSummary, shouldRun: !dump },
    { exec: printSerializationWarnings, shouldRun: !dump },
  ];

  const stepFunctions:StepExecutor[] = steps.filter((step) => step.shouldRun).map((step) => tapPromise(step.exec));

  return getDesignSystemComponentInfos(cwd)
    .then(getDesignSystemMetadata)
    .then((designSystem:DSMetadata) => pReduce(stepFunctions, (d, step) => step(designSystem), designSystem))
    .catch(logError);

}

function buildComponentsLibrary(buildOptions:BuildOptions):(ds:DSMetadata) => Promise<any> {
  return ({ result: { components } }) => buildDesignSystem(components, buildOptions);
}

function printDump({ warnings, result }:DSMetadata):void {
  console.log(stringifyObject(result));
  console.log(stringifyWarnings(warnings, true));
}

function printSummary({ result: { components } }:DSMetadata):void {
  console.log(getDesignSystemSummary(components));
}

function printSerializationWarnings({ warnings }:DSMetadata):void {
  console.log(stringifyWarnings(warnings));
}

function logError(errorMessage:string):void {
  console.log('ERROR:', errorMessage);
}

type StepExecutor = (designSystem:DSMetadata) => Promise<DSMetadata>;

interface Step {
  shouldRun:boolean;
  exec:(infos:DSMetadata) => any;
}

type DSMetadata = Warned<DesignSystemDefinition>;
