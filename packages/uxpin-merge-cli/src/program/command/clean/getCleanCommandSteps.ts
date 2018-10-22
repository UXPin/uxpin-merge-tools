import { remove } from 'fs-extra';
import { CleanProgramArgs } from '../../args/ProgramArgs';
import { getTempDirPath } from '../../args/providers/paths/getTempDirPath';
import { Step } from '../Step';

export function getCleanCommandSteps(args:CleanProgramArgs):Step[] {
  return [
    { exec: thunkCleanTemporaryDirectory(args), shouldRun: true },
  ];
}

function thunkCleanTemporaryDirectory(args:CleanProgramArgs):() => void {
  return () => {
    return remove(getTempDirPath(args));
  };
}
