import { parse, relative, posix } from 'path';
import { ComponentDefinition } from '../../serialization/component/ComponentDefinition';
import { TEMP_DIR_PATH } from '../config/getConfig';

const CLASS_NAME_WRAPPER = 'Wrapper';

export function getLibraryBundleSource(components: ComponentDefinition[], wrapperPath?: string): string {
  const libImports: string[] = ["import * as React from 'react';", "import * as ReactDOM from 'react-dom';"];

  const imports: string[] = components
    .filter((comp) => !comp.namespace)
    .map((comp) => `import ${getImportName(comp)} from '${getImportPath(comp)}';`);

  const wrapperImport: string[] = getWrapperImport(wrapperPath);

  const namespacedComponentDeclarations: string[] = getNamespacedComponentDeclarations(components);

  const exports: string[] = [
    `export {`,
    ...components.map((component) => `  ${getExportName(component)},`),
    ...(wrapperPath ? [`  ${CLASS_NAME_WRAPPER},`] : []),
    '  React,',
    '  ReactDOM,',
    `};`,
  ];

  return [...libImports, ...imports, ...wrapperImport, ...namespacedComponentDeclarations, ...exports].join('\n');
}

function normalizePath(path: string): string {
  return posix.normalize(path.replace(/\\/g, '/'));
}

function getImportName({ name, namespace, defaultExported }: ComponentDefinition): string {
  const componentName: string = namespace ? namespace.importSlug : name;

  if (defaultExported) {
    return componentName;
  }
  return `{ ${componentName} }`;
}

function getExportName({ name, namespace }: ComponentDefinition): string {
  return namespace ? namespace.importSlug : name;
}

function getImportPath({ info }: ComponentDefinition): string {
  const path: string = relative(TEMP_DIR_PATH, `./${info.dirPath}`);
  const fileName: string = parse(info.implementation.path).name;
  return normalizePath(`${path}/${fileName}`);
}

function getWrapperImport(wrapperPath?: string): string[] {
  if (!wrapperPath) {
    return [];
  }
  return [`import ${CLASS_NAME_WRAPPER} from '${normalizePath(relative(TEMP_DIR_PATH, wrapperPath))}';`];
}

function getNamespacedComponentDeclarations(components: ComponentDefinition[]): string[] {
  return components.filter((comp) => comp.namespace).map(getNamespacedComponentDeclaration);
}

function getNamespacedComponentDeclaration(component: ComponentDefinition): string {
  const { name, namespace } = component;
  if (!namespace) {
    throw new Error('Namespace not found!');
  }

  return `const ${namespace.importSlug} = ${namespace.name}.${name};`;
}
