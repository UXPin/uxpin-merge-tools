import { writeFile } from 'fs';
import { last } from 'lodash';
import { sep } from 'path';

const MODE_DEFAULT_EXPORTS:string = 'modeDefaultExports';
const MODE_NAMED_EXPORTS:string = 'modeNamedExports';
const CLASS_NAME_WRAPPER:string = 'Wrapper';

export function createComponentsLibrary(componentPaths:string[], wrapper:string):Promise<void> {
  return new Promise((resolve, reject) => {
    writeFile('src/components.js', getFileString(componentPaths, wrapper), 'utf8', (error) => {
      if (error) {
        return reject(error.message);
      }

      resolve();
    });
  });
}

function getComponentName(path:string):string {
  return last(path.split(sep)) as string;
}

function getComponentClassName(componentPath:string):string {
  return getComponentName(componentPath).split('-').map((part) => part[0].toUpperCase() + part.slice(1)).join('');
}

function getImportPath(path:string):string {
  const name:string = getComponentName(path);
  return `./${path}/${name}`;
}

function getDefaultExportsFileString(componentPaths:string[], wrapper:string):string {
  const imports:string[] = componentPaths.map((componentPath) =>
    `import ${getComponentClassName(componentPath)} from '${getImportPath(componentPath)}';`);

  const wrapperImport:string[] = wrapper ? [`import ${CLASS_NAME_WRAPPER} from '${wrapper}';`] : [];

  const exports:string[] = [
    `export {`,
    ...componentPaths.map((componentPath) => `  ${getComponentClassName(componentPath)},`),
    ...(wrapper ? [`  ${CLASS_NAME_WRAPPER}`] : []),
    `};`,
  ];

  return [...imports, ...wrapperImport, ...exports].join('\n');
}

function getNamedExportsFileString(componentPaths:string[], wrapper:string):string {
  const exports:string[] = componentPaths.map((componentPath) =>
    `export { ${getComponentClassName(componentPath)} } from '${getImportPath(componentPath)}';`);

  const wrapperExport:string[] = wrapper ? [`export { ${CLASS_NAME_WRAPPER} } from '${wrapper}';`] : [];

  return [...exports, ...wrapperExport].join('\n');
}

function getFileString(componentPaths:string[], wrapper:string, mode:string = MODE_DEFAULT_EXPORTS):string {
  if (mode === MODE_NAMED_EXPORTS) {
    return getNamedExportsFileString(componentPaths, wrapper);
  }

  return getDefaultExportsFileString(componentPaths, wrapper);
}
