import pMapSeries = require('p-map-series');
import { join } from 'path';
import sortobject = require('sortobject');
import { stringifyWarnings } from '../common/warning/stringifyWarnings';
import { Warned } from '../common/warning/Warned';
import { startServer } from '../debug/server/startServer';
import { buildDesignSystem } from '../steps/building/buildDesignSystem';
import { BuildOptions } from '../steps/building/BuildOptions';
import { TEMP_DIR_PATH } from '../steps/building/config/getConfig';
import { getComponentCategoryInfos } from '../steps/discovery/component/category/getComponentCategoryInfos';
import { getDesignSystemSummary } from '../steps/discovery/getDesignSystemSummary';
import { getAllComponentsFromCategories } from '../steps/serialization/component/categories/getAllComponentsFromCategories';
import { ComponentDefinition } from '../steps/serialization/component/ComponentDefinition';
import { DesignSystemSnapshot } from '../steps/serialization/DesignSystemSnapshot';
import { getDesignSystemMetadata } from '../steps/serialization/getDesignSystemMetadata';
import { tapPromise } from '../utils/promise/tapPromise';
import { getProgramArgs } from './getProgramArgs';
import { getProjectPaths } from './getProjectPaths';
import { ProgramArgs, RawProgramArgs } from './ProgramArgs';

export function runProgram(program:RawProgramArgs):Promise<any> {
  const programArgs:ProgramArgs = getProgramArgs(program);

  const steps:Step[] = getSteps(programArgs);
  const stepFunctions:StepExecutor[] = steps.filter((step) => step.shouldRun).map((step) => tapPromise(step.exec));

  return getComponentCategoryInfos(getProjectPaths(programArgs))
    .then(getDesignSystemMetadata)
    .then((designSystem:DSMetadata) => pMapSeries(stepFunctions, (step) => step(designSystem)))
    .catch(logError);

}

function getSteps(args:ProgramArgs):Step[] {
  const { cwd, webpackConfig, wrapper } = args;
  const buildOptions:BuildOptions = {
    projectRoot: cwd,
    webpackConfigPath: webpackConfig,
    wrapperPath: wrapper,
  };

  if (args.command === 'server') {
    return [
      { exec: thunkBuildComponentsLibrary(buildOptions), shouldRun: true },
      { exec: thunkStartServer(buildOptions, args.port), shouldRun: true },
    ];
  }

  const { dump, summary } = args;
  return [
    { exec: thunkBuildComponentsLibrary(buildOptions), shouldRun: !dump && !summary },
    { exec: printDump, shouldRun: dump },
    { exec: printSummary, shouldRun: !dump },
    { exec: printSerializationWarnings, shouldRun: !dump },
  ];
}

function thunkBuildComponentsLibrary(buildOptions:BuildOptions):(ds:DSMetadata) => Promise<any> {
  return ({ result: { categorizedComponents } }) => {
    const components:ComponentDefinition[] = getAllComponentsFromCategories(categorizedComponents);
    return buildDesignSystem(components, buildOptions);
  };
}

function thunkStartServer(buildOptions:BuildOptions, port:number):(ds:DSMetadata) => Promise<any> {
  return ({ result: { categorizedComponents } }) => startServer(getAllComponentsFromCategories(categorizedComponents), {
    port,
    root: join(buildOptions.projectRoot, TEMP_DIR_PATH),
  });
}

function printDump({ warnings, result }:DSMetadata):void {
  const INDENT:number = 2;
  console.log(JSON.stringify(sortobject(result), null, INDENT));
  console.error(stringifyWarnings(warnings, true));
}

function printSummary({ result: { categorizedComponents } }:DSMetadata):void {
  console.log(getDesignSystemSummary(categorizedComponents));
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

type DSMetadata = Warned<DesignSystemSnapshot>;
