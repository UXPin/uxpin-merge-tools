import { basename, resolve } from 'path';
import { printLine } from '../../../../utils/console/printLine';
import { PrintColor } from '../../../../utils/console/PrintOptions';
import { writeToFile } from '../../../../utils/fs/writeToFile';
import { GenerateAppProgramArgs } from '../../../args/ProgramArgs';
import { Step } from '../../Step';
import { APP_DIRECTORY } from './createAppDirectory';
import { components } from './createComponentsFiles';
import { AppConfig } from '../types/appConfig';
import { pathExists } from 'fs-extra';
import { yesNo } from '../../../utils/yesNo';

export function createUXPinConfigFile(args: GenerateAppProgramArgs): Step {
  return { exec: thunkCreateUXPinConfigFile(args), shouldRun: true };
}

function getComponents(includes: string[]) {
  return includes.map((include) => `          '${include}',`).join('\n');
}

function getCategories(components: Array<{ name: string; include: string[] }>) {
  return components
    .map(({ name, include }) =>
      [
        '      {',
        `        name: '${name}',`,
        `        include: [`,
        `${getComponents(include)}`,
        `        ]`,
        '      }',
      ].join('\n')
    )
    .join('\n');
}

export function thunkCreateUXPinConfigFile(args: GenerateAppProgramArgs): () => Promise<void> {
  return async () => {
    const uxpinConfigFile = [
      `module.exports = {`,
      `  name: '${basename(resolve(process.cwd(), args.directory))}',`,
      `  components: {`,
      `    categories: [`,
      `${getCategories(components)}`,
      `    ]`,
      `  }`,
      `};`,
    ].join('\n');

    let shouldOverwriteFile = true;
    const uxpinConfigFilePath: string = resolve(APP_DIRECTORY, 'uxpin.config.js');

    if (await pathExists(uxpinConfigFilePath)) {
      shouldOverwriteFile = await yesNo(`The file uxpin.config.js already exists. Do you want to overwrite it`);
    }

    if (shouldOverwriteFile) {
      await writeToFile(uxpinConfigFilePath, uxpinConfigFile);
      printLine(`✅ The file uxpin.config.js created`, { color: PrintColor.GREEN });
    }
  };
}
