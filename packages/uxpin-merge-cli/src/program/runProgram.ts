import pMapSeries = require('p-map-series');
import { getComponentCategoryInfos } from '../steps/discovery/component/category/getComponentCategoryInfos';
import { getDesignSystemMetadata } from '../steps/serialization/getDesignSystemMetadata';
import { tapPromise } from '../utils/promise/tapPromise';
import { getProgramArgs } from './args/getProgramArgs';
import { ProgramArgs, RawProgramArgs } from './args/ProgramArgs';
import { getProjectPaths } from './args/providers/paths/getProjectPaths';
import { getSteps } from './command/getSteps';
import { Step } from './command/Step';
import { DSMetadata } from './DSMeta';

export function runProgram(program:RawProgramArgs):Promise<any> {
  const programArgs:ProgramArgs = getProgramArgs(program);

  const steps:Step[] = getSteps(programArgs);
  const stepFunctions:StepExecutor[] = steps.filter((step) => step.shouldRun).map((step) => tapPromise(step.exec));

  return getComponentCategoryInfos(getProjectPaths(programArgs))
    .then(getDesignSystemMetadata)
    .then((designSystem:DSMetadata) => pMapSeries(stepFunctions, (step) => step(designSystem)))
    .catch(endWithError);
}

function endWithError(errorMessage:string):void {
  console.error('ERROR:', errorMessage);
  process.exit(1);
}

type StepExecutor = (designSystem:DSMetadata) => Promise<DSMetadata>;
