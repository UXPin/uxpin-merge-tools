import {
  ExperimentMetadataOptions,
  thunkSaveMetadataLibrary,
} from '../../../../steps/experimentation/metadata/saveMetadata';
import { ExperimentProgramArgs } from '../../../args/ProgramArgs';
import { getTempDirPath } from '../../../args/providers/paths/getTempDirPath';
import { Step } from '../../Step';

export function experimentationPrepareMetadataStep(args:ExperimentProgramArgs):Step {
  return { exec: thunkSaveMetadataLibrary(getMetadataOptions(args)), shouldRun: true };
}

function getMetadataOptions(args:ExperimentProgramArgs):ExperimentMetadataOptions {
  return {
    uxpinDirPath: getTempDirPath(args),
  };
}
