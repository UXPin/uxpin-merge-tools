import { BuildOptions } from '../../../steps/building/BuildOptions';
import { Step } from '../Step';
import { printSerializationWarnings } from '../../utils/printSerializationWarnings';
import { thunkBuildComponentsLibrary } from '../../utils/thunkBuildComponentsLibrary';

export function getPushCommandSteps(buildOptions:BuildOptions):Step[] {
  return [
    { exec: thunkBuildComponentsLibrary(buildOptions), shouldRun: true },
    { exec: printSerializationWarnings, shouldRun: true },
  ];
}
