import { ExperimentProgramArgs } from '../../args/ProgramArgs';
import { Step } from '../Step';
import { experimentationBuildLibraryStep } from './steps/experimentationBuildLibraryStep';
import { experimentationCreateEpidStep } from './steps/experimentationCreateEpidStep';
import { experimentationPrepareMetadataStep } from './steps/experimentationPrepareMetadataStep';
import { experimentationRunServerStep } from './steps/experimentationRunServerStep';

export function getExperimentationCommandSteps(args:ExperimentProgramArgs):Step[] {
  return [
    experimentationCreateEpidStep(args),
    experimentationBuildLibraryStep(args),
    experimentationPrepareMetadataStep(args),
    experimentationRunServerStep(args),
  ];
}
