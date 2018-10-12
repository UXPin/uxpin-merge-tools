import { BuildOptions } from '../../../steps/building/BuildOptions';
import { printSerializationWarnings } from '../../utils/printSerializationWarnings';
import { thunkBuildComponentsLibrary } from '../../utils/thunkBuildComponentsLibrary';
import { Step } from '../Step';

export function getPushCommandSteps(buildOptions:BuildOptions):Step[] {
  return [
    { exec: thunkBuildComponentsLibrary(buildOptions), shouldRun: true },
    { exec: printSerializationWarnings, shouldRun: true },
  ];
}
