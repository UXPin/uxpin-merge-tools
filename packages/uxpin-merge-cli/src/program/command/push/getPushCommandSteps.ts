import { BuildOptions } from '../../../steps/building/BuildOptions';
import { PushProgramArgs } from '../../args/ProgramArgs';
import { printSerializationWarnings } from '../../utils/printSerializationWarnings';
import { thunkBuildComponentsLibrary } from '../../utils/thunkBuildComponentsLibrary';
import { Step } from '../Step';
import { getBuildOptions } from './getBuildOptions';
import { printBranchWarning } from './steps/printBranchWarning';
import { uploadLibrary } from './steps/uploadLibrary';

export function getPushCommandSteps(args:PushProgramArgs):Step[] {
  const buildOptions:BuildOptions = getBuildOptions(args);

  return [
    { exec: thunkBuildComponentsLibrary(buildOptions), shouldRun: true },
    { exec: printBranchWarning, shouldRun: true },
    { exec: printSerializationWarnings, shouldRun: true },
    { exec: uploadLibrary(buildOptions), shouldRun: true },
  ];
}
