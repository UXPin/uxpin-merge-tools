import { StepExecutor } from '../../../program/command/Step';
import { DSMetadata } from '../../../program/DSMeta';
import { isFile } from '../../../utils/fs/isFile';
import { BuildOptions } from '../../building/BuildOptions';
import { createEPID } from './createEPID';
import { getEPIDFilePath } from './getEPIDFilePath';

export function thunkCreateEPID(buildOptions: BuildOptions): StepExecutor {
  return async (ds: DSMetadata) => {
    const { projectRoot } = buildOptions;
    const epidFilePath: string = getEPIDFilePath(projectRoot);
    const epidExists: boolean = await isFile(epidFilePath);

    if (!epidExists) {
      await createEPID(epidFilePath);
    }

    return ds;
  };
}
