import { pathExists } from 'fs-extra';
import { basename, resolve } from 'path';
import { printLine, printWarning } from '../../../../utils/console/printLine';
import { PrintColor } from '../../../../utils/console/PrintOptions';
import { writeToFile } from '../../../../utils/fs/writeToFile';
import { GenerateAppProgramArgs } from '../../../args/ProgramArgs';
import { Step } from '../../Step';
import { APP_DIRECTORY } from './createAppDirectory';
import { AppConfig } from '../types/appConfig';

const INDENT = 2;

export function createPackageJsonFile(args: GenerateAppProgramArgs, appConfig: AppConfig): Step {
  return { exec: thunkCreatePackageJsonFile(args, appConfig), shouldRun: true };
}

export function thunkCreatePackageJsonFile(args: GenerateAppProgramArgs, appConfig: AppConfig): () => Promise<void> {
  return async () => {
    const packageFile: {
      name?: string;
      dependencies?: { [key: string]: number | string };
    } = {};

    if ((!appConfig.packages || !appConfig.packages.length) && !appConfig.webpack) {
      return;
    }

    packageFile.name = basename(process.cwd());
    packageFile.dependencies = {};

    const packageJsonPath: string = resolve(APP_DIRECTORY, 'package.json');
    if (!(await pathExists(packageJsonPath))) {
      await writeToFile(packageJsonPath, JSON.stringify(packageFile, null, INDENT));
      printLine(`✅ File package.json created`, { color: PrintColor.GREEN });
    } else {
      printWarning(`👉 File package.json already exists`);
    }
  };
}
