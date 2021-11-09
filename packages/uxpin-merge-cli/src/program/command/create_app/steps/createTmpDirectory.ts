import { mkdir, pathExists } from 'fs-extra';
import { resolve } from 'path';
import { Step } from '../../Step';

export const TMP_DIRECTORY:string = resolve(process.cwd(), 'tmp');

export function createTmpDirectory():Step {
  return { exec: thunkCreateTmpDirectory(), shouldRun: true };
}

export function thunkCreateTmpDirectory():() => Promise<void> {
  return async () => {
    if (!await pathExists(TMP_DIRECTORY)) {
      await mkdir(TMP_DIRECTORY);
    }
  };
}
