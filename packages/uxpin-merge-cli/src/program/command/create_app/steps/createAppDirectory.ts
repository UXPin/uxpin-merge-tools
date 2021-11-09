import { mkdir, pathExists } from 'fs-extra';
import { resolve } from 'path';
import { printLine, printWarning } from '../../../../utils/console/printLine';
import { PrintColor } from '../../../../utils/console/PrintOptions';
import { CreateAppProgramArgs } from '../../../args/ProgramArgs';
import { Step } from '../../Step';
import { TMP_DIRECTORY } from './createTmpDirectory';

export let APP_DIRECTORY:string = '';

export function createAppDirectory(args:CreateAppProgramArgs):Step {
  return { exec: thunkCreateAppDirectory(args), shouldRun: true };
}

export function thunkCreateAppDirectory(args:CreateAppProgramArgs):() => Promise<void> {
  return async () => {
    if (!args.appName) {
      throw new Error('🛑 Invalid app name');
    }

    const appDirectory:string = resolve(TMP_DIRECTORY, args.appName);
    APP_DIRECTORY = appDirectory;
    if (!await pathExists(appDirectory)) {
      await mkdir(appDirectory);
      printLine(`✅ App directory "${args.appName}" created`, { color: PrintColor.GREEN });
    } else {
      printWarning(`👉 App directory "${args.appName}" exists`);
    }
  };
}
