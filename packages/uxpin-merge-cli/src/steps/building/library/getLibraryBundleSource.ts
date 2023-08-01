import debug from 'debug';
import { compact } from 'lodash';

import { parse, relative, posix } from 'path';
import prettyBytes = require('pretty-bytes');
import { ComponentDefinition } from '../../serialization/component/ComponentDefinition';
import { BuildOptions } from '../BuildOptions';
import { TEMP_DIR_PATH } from '../config/getConfig';

const CLASS_NAME_WRAPPER = 'Wrapper';

const log = debug('uxpin:build');

type LibraryBundleOptions = Pick<BuildOptions, 'wrapperPath' | 'pageHeadTags'>;

export function getLibraryBundleSource(components: ComponentDefinition[], options?: LibraryBundleOptions): string {
  const { wrapperPath, pageHeadTags } = options || {};
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

  const scriptToInjectTags = pageHeadTags?.length && generateScriptToInjectTagsInPageHead(pageHeadTags);

  return compact([
    ...libImports,
    ...imports,
    ...wrapperImport,
    ...namespacedComponentDeclarations,
    ...exports,
    scriptToInjectTags,
  ]).join('\n');
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

function generateScriptToInjectTagsInPageHead(htmlTags: string[]) {
  const html = htmlTags.reverse().join(''); // reverse the order before "prepending" to preserve the order of the tags
  log(`Content to be injected in page <head> (${prettyBytes(html.length)})`, html.slice(0, 100));
  return `
const template = document.createElement('template');
template.innerHTML = \`${html}\`;
const nodes = Array.from(template.content.children);
nodes.forEach(node => document.head.prepend(node));
`;
}
