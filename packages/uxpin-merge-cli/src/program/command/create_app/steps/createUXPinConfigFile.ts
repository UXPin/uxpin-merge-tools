import { mkdir, pathExists } from 'fs-extra';
import { resolve } from 'path';
import { printLine, printWarning } from '../../../../utils/console/printLine';
import { PrintColor } from '../../../../utils/console/PrintOptions';
import { writeToFile } from '../../../../utils/fs/writeToFile';
import { CreateAppProgramArgs } from '../../../args/ProgramArgs';
import { Step } from '../../Step';
import { APP_DIRECTORY } from './createAppDirectory';

const INDENT:number = 2;

export function createUXPinConfigFile(args:CreateAppProgramArgs):Step {
  return { exec: thunkCreateUXPinConfigFile(args), shouldRun: true };
}

export function thunkCreateUXPinConfigFile(args:CreateAppProgramArgs):() => Promise<void> {
  return async () => {
    const uxpinConfigFile:any = {};
    let componentsList:any = [];

    try {
      componentsList = JSON.parse(args.components || '');
    } catch (e) {
      console.log(e);
      // do nothing
    }

    uxpinConfigFile.name = args.appName;
    uxpinConfigFile.components = {
      categories: componentsList.map(({ name, imports }:any) => ({ name, imports })),
    };

    const uxpinConfigFilePath:string = resolve(APP_DIRECTORY, 'uxpin.config.js');
    await writeToFile(uxpinConfigFilePath, `module.exports = ${JSON.stringify(uxpinConfigFile,null, INDENT)}`);
    printLine(`✅ File uxpin.config.js created`, { color: PrintColor.GREEN });
  };
}
