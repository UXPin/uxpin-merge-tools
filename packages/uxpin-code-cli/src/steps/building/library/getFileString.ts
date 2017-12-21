import { parse, relative } from 'path';
import { ComponentDefinition } from '../../serialization/component/ComponentDefinition';
import { TEMP_DIR_PATH } from '../config/getConfig';

const CLASS_NAME_WRAPPER:string = 'Wrapper';

export function getFileString(components:ComponentDefinition[], wrapperPath?:string):string {
  const libImports:string[] = [
    'import * as React from \'react\';',
    'import * as ReactDOM from \'react-dom\';',
  ];

  const imports:string[] = components.map((comp) => `import ${comp.name} from '${getImportPath(comp)}';`);

  const wrapperImport:string[] = wrapperPath ? [`import ${CLASS_NAME_WRAPPER} from '${wrapperPath}';`] : [];

  const exports:string[] = [
    `export {`,
    ...components.map((component) => `  ${component.name},`),
    ...(wrapperPath ? [`  ${CLASS_NAME_WRAPPER},`] : []),
    '  React,',
    '  ReactDOM,',
    `};`,
  ];

  return [...libImports, ...imports, ...wrapperImport, ...exports].join('\n');
}

function getImportPath(component:ComponentDefinition):string {
  const path:string = relative(TEMP_DIR_PATH, `./${component.dirPath}`);
  const fileName:string = parse(component.implementation.path).name;
  return `${path}/${fileName}`;
}
