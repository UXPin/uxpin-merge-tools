import { pathExists } from 'fs-extra';
import { resolve } from 'path';
import { printLine, printWarning } from '../../../../utils/console/printLine';
import { PrintColor } from '../../../../utils/console/PrintOptions';
import { writeToFile } from '../../../../utils/fs/writeToFile';
import { Step } from '../../Step';
import { APP_DIRECTORY } from './createAppDirectory';
import {CreateAppProgramArgs} from "../../../args/ProgramArgs";

export function createNpmrcFile(args:CreateAppProgramArgs):Step {
  return { exec: thunkCreateNpmrcFile(args), shouldRun: true };
}

export function thunkCreateNpmrcFile(args:CreateAppProgramArgs):() => Promise<void> {
  return async () => {
    if (!args.npmrc) {
      return;
    }

    const npmrcFile:string = resolve(APP_DIRECTORY, '.npmrc');
    if (!await pathExists(npmrcFile)) {
      await writeToFile(npmrcFile, args.npmrc);
      printLine(`✅ File .npmrc created`, { color: PrintColor.GREEN });
    } else {
      printWarning(`👉 File .npmrc  exists`);
    }
  };
}
