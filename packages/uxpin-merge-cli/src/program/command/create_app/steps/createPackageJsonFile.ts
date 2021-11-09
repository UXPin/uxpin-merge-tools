import { mkdir, pathExists } from 'fs-extra';
import { resolve } from 'path';
import { printLine, printWarning } from '../../../../utils/console/printLine';
import { PrintColor } from '../../../../utils/console/PrintOptions';
import { writeToFile } from '../../../../utils/fs/writeToFile';
import { CreateAppProgramArgs } from '../../../args/ProgramArgs';
import { Step } from '../../Step';
import { APP_DIRECTORY } from './createAppDirectory';

const INDENT:number = 2;

export function createPackageJsonFile(args:CreateAppProgramArgs):Step {
  return { exec: thunkCreatePackageJsonFile(args), shouldRun: true };
}

export function thunkCreatePackageJsonFile(args:CreateAppProgramArgs):() => Promise<void> {
  return async () => {
    const packageFile:any = {};

    packageFile.name = args.appName;
    packageFile.dependencies = {};

    const packageJsonPath:string = resolve(APP_DIRECTORY, 'package.json');
    if (!await pathExists(packageJsonPath)) {
      await writeToFile(packageJsonPath, JSON.stringify(packageFile,null, INDENT));
      printLine(`✅ File package.json created`, { color: PrintColor.GREEN });
    } else {
      printWarning(`👉 File package.json exists`);
    }
  };
}
