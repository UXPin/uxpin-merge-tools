import { parse, relative } from 'path';
import { ComponentDefinition } from '../../serialization/component/ComponentDefinition';
import { TEMP_DIR_PATH } from '../config/getConfig';

const CLASS_NAME_WRAPPER:string = 'Wrapper';

export function getLibraryBundleSource(
    components:ComponentDefinition[],
    wrapperPath?:string,
    cssResources?:string,
):string {
  const libImports:string[] = [
    'import * as React from \'react\';',
    'import * as ReactDOM from \'react-dom\';',
  ];

  const imports:string[] = components
    .filter((comp) => !comp.namespace)
    .map((comp) => `import ${getImportName(comp)} from '${getImportPath(comp)}';`);

  const wrapperImport:string[] = getWrapperImport(wrapperPath);

  const namespacedComponentDeclarations:string[] = getNamespacedComponentDeclarations(components);

  let cssFiles:string[] = [];
  try {
    cssFiles = cssResources ? JSON.parse(cssResources) : [];
  } catch (e) {
    console.error(e);
    // do nothing
  }

  const cssImports:string[] = cssFiles
      .filter((cssFile) => !/^https.*/i.test(cssFile))
      .map((cssImport) => `import '../node_modules/${cssImport}';`);

  const cssUrls:string[] = cssFiles
      .filter((cssFile) => /^https.*/i.test(cssFile))
      .map((cssUrl,i) => ([
        `const link${i} = document.createElement('link');`,
        `link${i}.rel = 'stylesheet';`,
        `link${i}.type = 'text/css';`,
        `link${i}.href = "${cssUrl}";`,
        `document.getElementsByTagName("head")[0].appendChild(link${i});`,
      ].join('\n')));

  const exports:string[] = [
    `export {`,
    ...components.map((component) => `  ${getExportName(component)},`),
    ...(wrapperPath ? [`  ${CLASS_NAME_WRAPPER},`] : []),
    '  React,',
    '  ReactDOM,',
    `};`,
  ];

  return [
    ...libImports,
    ...imports,
    ...wrapperImport,
    ...cssImports,
    ...namespacedComponentDeclarations,
    ...cssUrls,
    ...exports,
  ].join('\n');
}

function getImportName({ name, namespace, defaultExported }:ComponentDefinition):string {
  const componentName:string = namespace ? namespace.importSlug : name;
  if (defaultExported) {
    return componentName;
  }
  return `{ ${componentName} }`;
}

function getExportName({ name, namespace }:ComponentDefinition):string {
  return namespace ? namespace.importSlug : name;
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
