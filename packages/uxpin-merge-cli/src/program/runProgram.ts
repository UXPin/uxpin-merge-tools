import pMapSeries = require('p-map-series');
import { InvalidPatternError } from '../steps/discovery/component/category/paths/getComponentCategoryPaths';
import { ProjectPaths } from '../steps/discovery/paths/ProjectPaths';
import { getDesignSystemMetadata } from '../steps/serialization/getDesignSystemMetadata';
import { tapPromise } from '../utils/promise/tapPromise';
import { getProgramArgs } from './args/getProgramArgs';
import { ProgramArgs, RawProgramArgs } from './args/ProgramArgs';
import { getProjectPaths } from './args/providers/paths/getProjectPaths';
import { Command } from './command/Command';
import { getSteps } from './command/getSteps';
import { getStepsForWatcher } from './command/getStepsForWatcher';
import { Step, StepExecutor } from './command/Step';
import { applyVersionCommandSteps } from './command/version/applyVersionCommandSteps';
import { DSMetadata } from './DSMeta';
import { setNodeEnv } from './env/setNodeEnv';
import { setupWatcher } from './watcher/setupWatcher';

export async function runProgram(program:RawProgramArgs):Promise<any> {
  try {
    setNodeEnv(process.env.UXPIN_ENV);
    const programArgs:ProgramArgs = getProgramArgs(program);
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
      if (error instanceof InvalidPatternError) {
        process.exit();
      }

      logError(error);
    }
  };
}

async function executeCommandSteps(programArgs:ProgramArgs, steps:Step[]):Promise<void> {
  const stepFunctions:StepExecutor[] = steps
    .filter((step) => step.shouldRun)
    .map((step) => tapPromise(step.exec));

  const paths:ProjectPaths = getProjectPaths(programArgs);
  const designSystem:DSMetadata = await getDesignSystemMetadata(programArgs, paths);

  await pMapSeries(stepFunctions, (step) => step(designSystem));
}

function isWatchChangesCommand(programArgs:ProgramArgs):boolean {
  return programArgs.command === Command.EXPERIMENT;
}

function endWithError(error:Error):void {
  if (!(error instanceof InvalidPatternError)) {
    logError(error.message);
  }

  process.exit(1);
}

function logError(errorMessage:string):void {
  console.error('ERROR:', errorMessage);
}
