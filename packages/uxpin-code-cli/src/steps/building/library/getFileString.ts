import { relative } from 'path';
import { ComponentInfo } from '../../discovery/component/ComponentInfo';
import { TEMP_DIR_PATH } from '../config/getConfig';
import { getComponentClassName } from './getComponentClassName';

const CLASS_NAME_WRAPPER:string = 'Wrapper';

export function getFileString(componentInfos:ComponentInfo[], wrapperPath?:string):string {
  const imports:string[] = componentInfos.map((info) =>
    `import ${getComponentClassName(info.name)} from '${getImportPath(info)}';`);

  const wrapperImport:string[] = wrapperPath ? [`import ${CLASS_NAME_WRAPPER} from '${wrapperPath}';`] : [];

  const exports:string[] = [
    `export {`,
    ...componentInfos.map((info) => `  ${getComponentClassName(info.name)},`),
    ...(wrapperPath ? [`  ${CLASS_NAME_WRAPPER},`] : []),
    `};`,
  ];

  return [...imports, ...wrapperImport, ...exports].join('\n');
}

function getImportPath(info:ComponentInfo):string {
  const path:string = relative(TEMP_DIR_PATH, `./${info.dirPath}`);
  return `${path}/${info.name}`;
}
