import pMapSeries = require('p-map-series');
import { ComponentCategoryInfo } from '../steps/discovery/component/category/ComponentCategoryInfo';
import { getComponentCategoryInfos } from '../steps/discovery/component/category/getComponentCategoryInfos';
import { getLibraryName } from '../steps/discovery/library/getLibraryName';
import { ProjectPaths } from '../steps/discovery/paths/ProjectPaths';
import { getDesignSystemMetadata } from '../steps/serialization/getDesignSystemMetadata';
import { tapPromise } from '../utils/promise/tapPromise';
import { getProgramArgs } from './args/getProgramArgs';
import { ProgramArgs, RawProgramArgs } from './args/ProgramArgs';
import { getProjectPaths } from './args/providers/paths/getProjectPaths';
import { Command } from './command/Command';
import { getSteps } from './command/getSteps';
import { getStepsForWatcher } from './command/getStepsForWatcher';
import { Step } from './command/Step';
import { applyVersionCommandSteps } from './command/version/applyVersionCommandSteps';
import { DSMetadata } from './DSMeta';
import { setupWatcher } from './watcher/setupWatcher';

export async function runProgram(program:RawProgramArgs):Promise<any> {
  try {
    const programArgs:ProgramArgs = getProgramArgs(program);
    setNodeEnv(programArgs.dev);
    await setupProjectWatcher(programArgs);
    await runCommand(programArgs);
  } catch (error) {
    endWithError(error);
  }
}

async function runCommand(programArgs:ProgramArgs):Promise<any> {
  await executeCommandSteps(programArgs, applyVersionCommandSteps(getSteps(programArgs)));
}

async function setupProjectWatcher(programArgs:ProgramArgs):Promise<void> {
  if (!isWatchChangesCommand(programArgs)) {
    return;
  }

  await setupWatcher(programArgs, thunkRunCommandWhenFilesChanged(programArgs));
}

function thunkRunCommandWhenFilesChanged(programArgs:ProgramArgs):(path:string) => void {
  return async () => {
    try {
      await executeCommandSteps(programArgs, getStepsForWatcher(programArgs));
    } catch (error) {
      logError(error);
    }
  };
}

async function executeCommandSteps(programArgs:ProgramArgs, steps:Step[]):Promise<void> {
  const paths:ProjectPaths = getProjectPaths(programArgs);
  const stepFunctions:StepExecutor[] = steps
    .filter((step) => step.shouldRun)
    .map((step) => tapPromise(step.exec));
  const infos:ComponentCategoryInfo[] = await getComponentCategoryInfos(paths);
  const name:string = getLibraryName(paths);
  const designSystem:DSMetadata = await getDesignSystemMetadata(infos, name, paths);
  await pMapSeries(stepFunctions, (step) => step(designSystem));
}

function setNodeEnv(development:boolean|undefined):void {
  if (development) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  }
}

function isWatchChangesCommand(programArgs:ProgramArgs):boolean {
  return programArgs.command === Command.EXPERIMENT;
}

function endWithError(errorMessage:string):void {
  logError(errorMessage);
  process.exit(1);
}

function logError(errorMessage:string):void {
  console.error('ERROR:', errorMessage);
}

type StepExecutor = (designSystem:DSMetadata) => Promise<DSMetadata>;
