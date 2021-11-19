import pMapSeries = require('p-map-series');
import { ProjectPaths } from '../steps/discovery/paths/ProjectPaths';
import { getDesignSystemMetadata } from '../steps/serialization/getDesignSystemMetadata';
import { tapPromise } from '../utils/promise/tapPromise';
import { getProgramArgs } from './args/getProgramArgs';
import { CreateAppProgramArgs, ProgramArgs, RawProgramArgs } from './args/ProgramArgs';
import { getProjectPaths } from './args/providers/paths/getProjectPaths';
import { Command } from './command/Command';
import { getSteps } from './command/getSteps';
import { getStepsForWatcher } from './command/getStepsForWatcher';
import { Step, StepExecutor, StepWithoutDSExecutor } from './command/Step';
import { DSMetadata } from './DSMeta';
import { setNodeEnv } from './env/setNodeEnv';
import { printCurrentVersionInfo } from './utils/version/printCurrentVersion';
import { setupWatcher } from './watcher/setupWatcher';

export async function runProgram(program:RawProgramArgs):Promise<any> {
  try {
    setNodeEnv(process.env.UXPIN_ENV);
    printCurrentVersionInfo();
    const programArgs:ProgramArgs = getProgramArgs(program);
    if (programArgs.command !== Command.CREATE_APP) {
      await setupProjectWatcher(programArgs);
    }
    await runCommand(programArgs);
  } catch (error) {
    endWithError(error);
  }
}

async function runCommand(programArgs:ProgramArgs):Promise<any> {
  await executeCommandSteps(programArgs, getSteps(programArgs));
}

async function setupProjectWatcher(programArgs:Exclude<ProgramArgs, CreateAppProgramArgs>):Promise<void> {
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
  const stepFunctions:Array<StepExecutor|StepWithoutDSExecutor> = steps
    .filter((step) => step.shouldRun)
    .map((step) => tapPromise(step.exec));

  if (shouldPassDesignSystemToCommand(programArgs)) {
    const paths:ProjectPaths = getProjectPaths(programArgs as Exclude<ProgramArgs, CreateAppProgramArgs>);
    const designSystem:DSMetadata = await getDesignSystemMetadata(
        programArgs  as Exclude<ProgramArgs, CreateAppProgramArgs>,
        paths,
    );
    await pMapSeries(stepFunctions as StepExecutor[], (step) => step(designSystem));
  } else {
    await pMapSeries(stepFunctions as StepWithoutDSExecutor[], (step) => step());
  }
}

function shouldPassDesignSystemToCommand(programArgs:ProgramArgs):boolean {
  return ![Command.GENERATE_PRESETS, Command.CREATE_APP].includes(programArgs.command);
}

function isWatchChangesCommand(programArgs:ProgramArgs):boolean {
  return programArgs.command === Command.EXPERIMENT;
}

function endWithError(error:Error | string):void {
  logError(error);

  process.exit(1);
}

function logError(error:Error | string):void {
  console.error('ERROR:', error instanceof Error ? error.message : error);
}
