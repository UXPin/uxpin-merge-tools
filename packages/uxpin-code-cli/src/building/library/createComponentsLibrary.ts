import { writeFile } from 'fs';

import { ComponentInfo } from '../../components/ComponentInfo';
import { getComponentClassName } from './getComponentClassName';

const CLASS_NAME_WRAPPER:string = 'Wrapper';

export function createComponentsLibrary(componentInfos:ComponentInfo[], wrapperPath?:string):Promise<void> {
  return new Promise((resolve, reject) => {
    writeFile('src/components.js', getFileString(componentInfos, wrapperPath), 'utf8', (error) => {
      if (error) {
        return reject(error.message);
      }

      resolve();
    });
  });
}

function getImportPath(info:ComponentInfo):string {
  return `./${info.dirPath}/${info.name}`;
}

function getFileString(componentInfos:ComponentInfo[], wrapperPath?:string):string {
  const imports:string[] = componentInfos.map((info) =>
    `import ${getComponentClassName(info.name)} from '${getImportPath(info)}';`);

  const wrapperImport:string[] = wrapperPath ? [`import ${CLASS_NAME_WRAPPER} from '${wrapperPath}';`] : [];

  const exports:string[] = [
    `export {`,
    ...componentInfos.map((info) => `  ${getComponentClassName(info.name)},`),
    ...(wrapperPath ? [`  ${CLASS_NAME_WRAPPER}`] : []),
    `};`,
  ];

  return [...imports, ...wrapperImport, ...exports].join('\n');
}
