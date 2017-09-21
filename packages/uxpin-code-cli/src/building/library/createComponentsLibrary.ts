import { writeFile } from 'fs';

import { ComponentInfo } from '../../components/ComponentInfo';

const CLASS_NAME_WRAPPER:string = 'Wrapper';

export function createComponentsLibrary(componentInfos:ComponentInfo[], wrapper:string):Promise<void> {
  return new Promise((resolve, reject) => {
    writeFile('src/components.js', getFileString(componentInfos, wrapper), 'utf8', (error) => {
      if (error) {
        return reject(error.message);
      }

      resolve();
    });
  });
}

function getComponentClassName(componentName:string):string {
  return componentName.split('-').map((part) => part[0].toUpperCase() + part.slice(1)).join('');
}

function getImportPath(info:ComponentInfo):string {
  return `./${info.dirPath}/${info.name}`;
}

function getFileString(componentInfos:ComponentInfo[], wrapper:string):string {
  const imports:string[] = componentInfos.map((info) =>
    `import ${getComponentClassName(info.name)} from '${getImportPath(info)}';`);

  const wrapperImport:string[] = wrapper ? [`import ${CLASS_NAME_WRAPPER} from '${wrapper}';`] : [];

  const exports:string[] = [
    `export {`,
    ...componentInfos.map((info) => `  ${getComponentClassName(info.name)},`),
    ...(wrapper ? [`  ${CLASS_NAME_WRAPPER}`] : []),
    `};`,
  ];

  return [...imports, ...wrapperImport, ...exports].join('\n');
}
