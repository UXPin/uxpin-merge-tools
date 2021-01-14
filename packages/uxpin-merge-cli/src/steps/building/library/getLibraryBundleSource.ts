import { parse, relative } from 'path';
import { ComponentDefinition } from '../../serialization/component/ComponentDefinition';
import { isStorybookComponent } from '../../serialization/component/storybook/isStorybookComponent';
import { TEMP_DIR_PATH } from '../config/getConfig';

const CLASS_NAME_WRAPPER:string = 'Wrapper';

export function getLibraryBundleSource(components:ComponentDefinition[], wrapperPath?:string):string {
  const libImports:string[] = [
    'import * as React from \'react\';',
    'import * as ReactDOM from \'react-dom\';',
  ];

  // Build the list of imports for the component
  const imports:string[] = [];
  components
    .filter((comp) => !comp.namespace)
    .forEach((comp) => {
      const importName:string = getImportName(comp);

      // If we're dealing with a storybook import then the import name is <component>Stories
      // (see getImportName) and we must do some work to get <component> to be the right export.
      // the path to the import is still correct but the exported object is a CSF-structured bundle
      // https://storybook.js.org/docs/react/writing-stories/introduction
      if (isStorybookComponent(comp)) {
        const sbImportName:string = `${importName}Stories`;
        imports.push(`import ${sbImportName} from '${getImportPath(comp)}';`);
        imports.push(`const ${importName} = ${sbImportName}.component;`);
        return;
      }

      // Add the import
      imports.push(`import ${importName} from '${getImportPath(comp)}';`);
    });

  const wrapperImport:string[] = getWrapperImport(wrapperPath);

  const namespacedComponentDeclarations:string[] = getNamespacedComponentDeclarations(components);

  const exports:string[] = [
    `export {`,
    ...components.map((component) => `  ${getImportName(component)},`),
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

function getImportName(def:ComponentDefinition):string {
  const { name, namespace } = def;

  if (namespace) {
    return namespace.importSlug;
  }

  // Import names for Storybook components should be stripped of .stories
  if (isStorybookComponent(def)) {
    return name.replace('.stories', '');
  }

  return name;
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
