import { ensureDir, pathExists } from 'fs-extra';
import { resolve } from 'path';
import { printError, printLine, printWarning } from '../../../../utils/console/printLine';
import { PrintColor } from '../../../../utils/console/PrintOptions';
import { GenerateAppProgramArgs } from '../../../args/ProgramArgs';
import { Step } from '../../Step';

export let APP_DIRECTORY = '';

export function createAppDirectory(args: GenerateAppProgramArgs): Step {
  return { exec: thunkCreateAppDirectory(args), shouldRun: true };
}

export function thunkCreateAppDirectory(args: GenerateAppProgramArgs): () => Promise<void> {
  return async () => {
    const appDirectory = resolve(process.cwd(), args.directory);
    APP_DIRECTORY = appDirectory;
    try {
      if (await pathExists(appDirectory)) {
        printWarning(`👉 App directory ${appDirectory} already exists`);
        return;
      }

      await ensureDir(appDirectory);
      printLine(`✅ App directory "${appDirectory}" created`, { color: PrintColor.GREEN });
    } catch {
      printError(`Can't create directory - "${appDirectory}"`);
    }
  };
}
