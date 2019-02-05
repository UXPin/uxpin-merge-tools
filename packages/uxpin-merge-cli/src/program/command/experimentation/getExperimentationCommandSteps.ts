import { Store } from '../../../program/utils/store/Store';
import { ExperimentProgramArgs } from '../../args/ProgramArgs';
import { Step } from '../Step';
import { experimentationBuildLibraryStep } from './steps/experimentationBuildLibraryStep';
import { experimentationCreateEpidStep } from './steps/experimentationCreateEpidStep';
import { experimentationOpenBrowserStep } from './steps/experimentationOpenBrowserStep';
import { experimentationPrepareMetadataStep } from './steps/experimentationPrepareMetadataStep';
import { experimentationRunServerStep } from './steps/experimentationRunServerStep';
import { experimentationRunNgrok } from './steps/experimentationRunNgrok';

export interface ExperimentationState {
  ngrokUrl:string|null,
}

const defaultState:ExperimentationState = {
  ngrokUrl: null,
};

export function getExperimentationCommandSteps(args:ExperimentProgramArgs):Step[] {
  const store:Store<ExperimentationState> = new Store(defaultState);

  return [
    experimentationBuildLibraryStep(args, store),
    experimentationCreateEpidStep(args, store),
    experimentationPrepareMetadataStep(args, store),
    experimentationRunNgrok(args, store),
    experimentationRunServerStep(args, store),
    experimentationOpenBrowserStep(args, store),
  ];
}
