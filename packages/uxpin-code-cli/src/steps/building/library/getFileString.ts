import { relative } from 'path';
import { ComponentDefinition } from '../../serialization/component/ComponentDefinition';
import { TEMP_DIR_PATH } from '../config/getConfig';
import { getComponentClassName } from './getComponentClassName';

const CLASS_NAME_WRAPPER:string = 'Wrapper';

export function getFileString(components:ComponentDefinition[], wrapperPath?:string):string {
  const imports:string[] = components.map((info) =>
    `import ${getComponentClassName(info.name)} from '${getImportPath(info)}';`);

  const wrapperImport:string[] = wrapperPath ? [`import ${CLASS_NAME_WRAPPER} from '${wrapperPath}';`] : [];

  const exports:string[] = [
    `export {`,
    ...components.map((def) => `  ${getComponentClassName(def.name)},`),
    ...(wrapperPath ? [`  ${CLASS_NAME_WRAPPER},`] : []),
    `};`,
  ];

  return [...imports, ...wrapperImport, ...exports].join('\n');
}

function getImportPath(info:ComponentDefinition):string {
  const path:string = relative(TEMP_DIR_PATH, `./${info.dirPath}`);
  return `${path}/${info.name}`;
}
