import { thunkCreateEPID } from '../../../../steps/experimentation/epid/thunkCreateEPID';
import { ExperimentProgramArgs } from '../../../args/ProgramArgs';
import { Step } from '../../Step';
import { getBuildOptions } from './experimentationBuildLibraryStep';

export function experimentationCreateEpidStep(args: ExperimentProgramArgs): Step {
  return { exec: thunkCreateEPID(getBuildOptions(args)), shouldRun: true };
}
