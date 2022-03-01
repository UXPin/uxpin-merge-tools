import { mkdir, pathExists } from 'fs-extra';
import pMapSeries = require('p-map-series');
import { resolve } from 'path';
import { printLine } from '../../../../utils/console/printLine';
import { PrintColor } from '../../../../utils/console/PrintOptions';
import { writeToFile } from '../../../../utils/fs/writeToFile';
import { CreateAppProgramArgs } from '../../../args/ProgramArgs';
import { Step } from '../../Step';
import { APP_DIRECTORY } from './createAppDirectory';

export function createComponentsFiles(args:CreateAppProgramArgs):Step {
  return { exec: thunkCreateComponentsFiles(args), shouldRun: true };
}

const SUFFIX:string = 'El';

export let components:Array<{ name:string, include:string[] }> = [];

function getComponentContent(name:string, packageName:string):string {
  return [
    `import React from 'react';`,
    '',
    `const packageData = require('${packageName}') || {};`,
    `const ${name}${SUFFIX} = packageData.${name} ? packageData.${name} : packageData.default;`,
    '',
    `const ${name} = (props) => (`,
    ` <${name}${SUFFIX} {...props} />`,
    `);`,
    '',
    `export default ${name};`,
  ].join('\n');
}

export function thunkCreateComponentsFiles(args:CreateAppProgramArgs):() => Promise<void> {
  return async () => {
    let componentsList:Array<{ categoryName:string, components:Array<{ name:string, packageName:string }> }> = [];

    try {
      componentsList = JSON.parse(args.components || '');
    } catch (e) {
      console.log(e);
      // do nothing
    }

    const componentsPath:string = resolve(APP_DIRECTORY, 'components');
    if (!await pathExists(componentsPath)) {
      mkdir(componentsPath);
    }

    await pMapSeries(componentsList, async (componentData) => {
      components.push({ name: componentData.categoryName, include: [] });
      await pMapSeries(componentData.components, async ({ name, packageName }) => {
        const componentFile:string = `${componentsPath}/${name}.jsx`;

        await writeToFile(componentFile, getComponentContent(name, packageName));
        components[components.length - 1].include.push(`components/${name}.jsx`);
        printLine(`✅ File ${componentFile} created`, { color: PrintColor.GREEN });
      });
    });
  };
}
