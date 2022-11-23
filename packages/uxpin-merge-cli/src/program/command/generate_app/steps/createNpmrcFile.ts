import { pathExists } from 'fs-extra';
import { resolve } from 'path';
import { printLine, printWarning } from '../../../../utils/console/printLine';
import { PrintColor } from '../../../../utils/console/PrintOptions';
import { writeToFile } from '../../../../utils/fs/writeToFile';
import { GenerateAppProgramArgs } from '../../../args/ProgramArgs';
import { Step } from '../../Step';
import { APP_DIRECTORY } from './createAppDirectory';
import { AppConfig } from '../types/appConfig';

export function createNpmrcFile(args: GenerateAppProgramArgs, appConfig: AppConfig): Step {
  return { exec: thunkCreateNpmrcFile(args, appConfig), shouldRun: true };
}

export function thunkCreateNpmrcFile(args: GenerateAppProgramArgs, appConfig: AppConfig): () => Promise<void> {
  return async () => {
    if (!appConfig.npmrc) {
      return;
    }

    const npmrcFile: string = resolve(APP_DIRECTORY, '.npmrc');
    if (!(await pathExists(npmrcFile))) {
      await writeToFile(npmrcFile, appConfig.npmrc);
      printLine(`✅ File .npmrc created`, { color: PrintColor.GREEN });
    } else {
      printWarning(`👉 File .npmrc already exists`);
    }
  };
}
