import { DeleteOptions } from '../../../steps/deleting/DeleteOptions';
import { DeleteVersionArgs } from '../../args/ProgramArgs';
import { Step } from '../Step';
import { getDeleteOptions } from './getDeleteOptions';
import { deleteRepositoryPointer } from './steps/DeleteRepositoryPointer';

export function getDeleteVersionCommandSteps(args:DeleteVersionArgs):Step[] {
  const deleteOptions:DeleteOptions = getDeleteOptions(args);

  return [
        { exec: deleteRepositoryPointer(deleteOptions), shouldRun: true },
  ];
}
