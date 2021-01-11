import { parse, relative } from 'path';
import { ComponentDefinition } from '../../serialization/component/ComponentDefinition';
import { TEMP_DIR_PATH } from '../config/getConfig';

const CLASS_NAME_WRAPPER:string = 'Wrapper';

export function getLibraryBundleSource(components:ComponentDefinition[], wrapperPath?:string):string {
  const libImports:string[] = [
    'import * as React from \'react\';',
    'import * as ReactDOM from \'react-dom\';',
  ];

  // Build the list of imports for the component
  const imports:string[] = components
    .filter((comp) => !comp.namespace)
    .map((comp) => {
      let importName = getImportName(comp);

      // If we're dealing with a storybook import then we need to do some more work to the import statement to extract what we want
      // the path to the import is still correct but what it exports is different
      // https://storybook.js.org/docs/react/writing-stories/introduction
      if (comp.name && comp.name.endsWith('.stories')) {
        importName = `{ component as ${importName} }`;
      }

      return `import ${importName} from '${getImportPath(comp)}';`;
    });

  const wrapperImport:string[] = getWrapperImport(wrapperPath);

  const namespacedComponentDeclarations:string[] = getNamespacedComponentDeclarations(components);

  const exports:string[] = [
    `export {`,
    ...components.map((component) => {
      const importName = getImportName(component);

      // If we're dealing with a storybook import we need ot ensure the export name matches
      if (importName.endsWith('Story')) {
        const withoutStory = importName.replace(/Story$/, '');
        return `  ${importName} as ${withoutStory},`;
      }

      return `  ${getImportName(component)},`;
    }),
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

function getImportName({ name, namespace }:ComponentDefinition):string {
  if (namespace) {
    return namespace.importSlug;
  }

  // Import names for Storybook components should be stripped of .stories suffix
  // and we'll use '<component Name>Story' instead
  if (name.endsWith('.stories')) {
    return name.replace(/\.stories$/, 'Story');
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
