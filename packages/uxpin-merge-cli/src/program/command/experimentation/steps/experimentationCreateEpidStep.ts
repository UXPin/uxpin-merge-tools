import { Store } from '../../../../program/utils/store/Store';
import { thunkCreateEPID } from '../../../../steps/experimentation/epid/thunkCreateEPID';
import { ExperimentProgramArgs } from '../../../args/ProgramArgs';
import { Step } from '../../Step';
import { getBuildOptions } from './experimentationBuildLibraryStep';
import { ExperimentationState } from '../getExperimentationCommandSteps';

export function experimentationCreateEpidStep(args:ExperimentProgramArgs, store:Store<ExperimentationState>):Step {
  return { exec: thunkCreateEPID(getBuildOptions(args), store), shouldRun: true };
}
