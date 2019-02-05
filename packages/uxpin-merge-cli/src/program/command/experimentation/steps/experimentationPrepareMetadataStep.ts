import { Store } from '../../../../program/utils/store/Store';
import {
  ExperimentMetadataOptions,
  thunkSaveMetadataLibrary,
} from '../../../../steps/experimentation/metadata/saveMetadata';
import { ExperimentProgramArgs } from '../../../args/ProgramArgs';
import { getTempDirPath } from '../../../args/providers/paths/getTempDirPath';
import { Step } from '../../Step';
import { ExperimentationState } from '../getExperimentationCommandSteps';

export function experimentationPrepareMetadataStep(args:ExperimentProgramArgs, store:Store<ExperimentationState>):Step {
  return { exec: thunkSaveMetadataLibrary(getMetadataOptions(args)), shouldRun: true };
}

function getMetadataOptions(args:ExperimentProgramArgs):ExperimentMetadataOptions {
  return {
    uxpinDirPath: getTempDirPath(args),
  };
}
