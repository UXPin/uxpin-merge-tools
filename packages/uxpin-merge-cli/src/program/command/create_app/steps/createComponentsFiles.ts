import { mkdir, pathExists } from 'fs-extra';
import pMapSeries = require('p-map-series');
import { resolve } from 'path';
import { printLine } from '../../../../utils/console/printLine';
import { PrintColor } from '../../../../utils/console/PrintOptions';
import { writeToFile } from '../../../../utils/fs/writeToFile';
import { getParsedImports, Import } from '../../../../utils/getParsedImports';
import { CreateAppProgramArgs } from '../../../args/ProgramArgs';
import { Step } from '../../Step';
import { APP_DIRECTORY } from './createAppDirectory';

export function createComponentsFiles(args:CreateAppProgramArgs):Step {
  return { exec: thunkCreateComponentsFiles(args), shouldRun: true };
}

const SUFFIX:string = 'El';

export let components:Array<{ name:string, include:string[] }> = [];

function getComponentContent(componentImport:string, componentName:string):string {
  return [
    `import React from 'react';`,
    `${componentImport};`,
    '',
    `const ${componentName} = (props) => (`,
    ` <${componentName}${SUFFIX} {...props} />`,
    `);`,
    '',
    `export default ${componentName};`,
  ].join('\n');
}

function decorateImport(parsedImport:Import):string {
  if (parsedImport.defaultImport) {
    return [
      `import ${parsedImport.defaultImport}${SUFFIX}`,
      `from '${parsedImport.moduleName}'`,
    ].join(' ');
  }

  if (parsedImport.namedImports[0].name) {
    return [
      `import { ${parsedImport.namedImports[0].name } as ${parsedImport.namedImports[0].name}${SUFFIX} }`,
      `from '${parsedImport.moduleName}'`,
    ].join(' ');
  }

  return '';
}

export function thunkCreateComponentsFiles(args:CreateAppProgramArgs):() => Promise<void> {
  return async () => {
    let componentsList:Array<{ name:string, imports:string[] }> = [];

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

    await pMapSeries(componentsList, async ({ imports, name }) => {
      components.push({ name, include: [] });
      await pMapSeries(imports, async (componentImport) => {
        const parsedImport:Import[] = getParsedImports(componentImport);
        const componentName:string = parsedImport[0].defaultImport || parsedImport[0].namedImports[0].name;
        const componentFile:string = `${componentsPath}/${componentName}.jsx`;
        const decoratedImport:string = decorateImport(parsedImport[0]);

        await writeToFile(componentFile, getComponentContent(decoratedImport, componentName));
        components[components.length - 1].include.push(`components/${componentName}.jsx`);
        printLine(`✅ File ${componentFile} created`, { color: PrintColor.GREEN });
      });
    });
  };
}
