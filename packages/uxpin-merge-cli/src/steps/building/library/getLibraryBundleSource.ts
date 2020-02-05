import { parse, relative } from 'path';
import { ComponentDefinition } from '../../serialization/component/ComponentDefinition';
import { TEMP_DIR_PATH } from '../config/getConfig';

const CLASS_NAME_WRAPPER:string = 'Wrapper';

export function getLibraryBundleSource(comps:ComponentDefinition[], wrapperPath?:string):string {
  const libImports:string[] = [
    'import * as React from \'react\';',
    'import * as ReactDOM from \'react-dom\';',
  ];

  const imports:string[] = comps
    .filter((comp) => !comp.namespace)
    .map((comp) => `import {${getExportName(comp)} as ${getNamedImportName(comp)}} from '${getImportPath(comp)}';
import ${getDefaultImportName(comp)} from '${getImportPath(comp)}';
`);

  const wrapperImport:string[] = getWrapperImport(wrapperPath);

  const namespacedComponentDeclarations:string[] = getNamespacedComponentDeclarations(comps);

  const exports:string[] = [
    ...comps.map((c) => `export const ${getExportName(c)} = ${getDefaultImportName(c)} || ${getNamedImportName(c)};`),
    `export {`,
    ...(wrapperPath ? [`  ${CLASS_NAME_WRAPPER},`] : []),
    '  React,',
    '  ReactDOM,',
    `};`,
  ];

  return [
    ...libImports,
    ...imports,
    ...wrapperImport,
    ...namespacedComponentDeclarations,
    ...exports,
  ].join('\n');
}

function getExportName({ name, namespace }:ComponentDefinition):string {
  if (namespace) {
    return namespace.importSlug;
  }

  return name;
}

function getNamedImportName(component:ComponentDefinition):string {
  return `Named_${getExportName(component)}`;
}

function getDefaultImportName(component:ComponentDefinition):string {
  return `Default_${getExportName(component)}`;
}

function getImportPath({ info }:ComponentDefinition):string {
  const path:string = relative(TEMP_DIR_PATH, `./${info.dirPath}`);
  const fileName:string = parse(info.implementation.path).name;
  return `${path}/${fileName}`;
}

function getWrapperImport(wrapperPath?:string):string[] {
  if (!wrapperPath) {
    return [];
  }
  return [`import ${CLASS_NAME_WRAPPER} from '${relative(TEMP_DIR_PATH, wrapperPath)}';`];
}

function getNamespacedComponentDeclarations(components:ComponentDefinition[]):string[] {
  return components
    .filter((comp) => comp.namespace)
    .map(getNamespacedComponentDeclaration);
}

function getNamespacedComponentDeclaration(component:ComponentDefinition):string {
  const { name, namespace } = component;
  if (!namespace) {
    throw new Error('Namespace not found!');
  }

  return `const ${namespace.importSlug} = ${namespace.name}.${name};`;
}
