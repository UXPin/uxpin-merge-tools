import { ensureDir, mkdir, pathExists } from 'fs-extra';
import { resolve, parse } from 'path';
import { printLine } from '../../../../utils/console/printLine';
import { PrintColor } from '../../../../utils/console/PrintOptions';
import { writeToFile } from '../../../../utils/fs/writeToFile';
import { GenerateAppProgramArgs } from '../../../args/ProgramArgs';
import { Step } from '../../Step';
import { APP_DIRECTORY } from './createAppDirectory';
import { AppConfig } from '../types/appConfig';
import { yesNo } from '../../../utils/yesNo';

export function createWrapperFile(args: GenerateAppProgramArgs, appConfig?: AppConfig): Step {
  return { exec: thunkCreateWrapperFile(args, appConfig), shouldRun: true };
}

function getWrapperContent(name: string): string {
  return [
    `import React from 'react';`,
    '',
    `const ${name} = ({ children }) => {`,
    `  return children;`,
    `};`,
    '',
    `export default ${name};`,
  ]
    .filter((value) => value !== null)
    .join('\n');
}

export let wrapperPath = '';

function capitalizeFirstLetter(string: string) {
  return string[0].toUpperCase() + string.slice(1);
}

export function thunkCreateWrapperFile(args: GenerateAppProgramArgs, appConfig?: AppConfig): () => Promise<void> {
  return async () => {
    if (!appConfig || !appConfig.wrapper) {
      return;
    }

    const componentsPath = resolve(APP_DIRECTORY, 'components');
    if (!(await pathExists(componentsPath))) {
      mkdir(componentsPath);
    }

    const componentName = capitalizeFirstLetter(parse(appConfig.wrapper).name);
    const wrapperDir = resolve(componentsPath, componentName);
    wrapperPath = resolve(wrapperDir, appConfig.wrapper);

    let shouldOverwriteFile = true;

    if (await pathExists(wrapperPath)) {
      shouldOverwriteFile = await yesNo(`The file ${appConfig.wrapper} already exists. Do you want to overwrite it`);
    }

    if (shouldOverwriteFile) {
      await ensureDir(wrapperDir);
      await writeToFile(wrapperPath, getWrapperContent(componentName));
      printLine(`✅ File ${appConfig.wrapper} created`, { color: PrintColor.GREEN });
    }
  };
}
