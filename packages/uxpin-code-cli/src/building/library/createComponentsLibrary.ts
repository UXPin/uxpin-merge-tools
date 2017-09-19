import { writeFile } from 'fs';

const MODE_DEFAULT_EXPORTS:string = 'modeDefaultExports';
const MODE_NAMED_EXPORTS:string = 'modeNamedExports';
const CLASS_NAME_WRAPPER:string = 'Wrapper';

function getComponentClassName(componentName:string):string {
  return componentName.split('-').map((part) => part[0].toUpperCase() + part.slice(1)).join('');
}

function getDefaultExportsFileString(components:string[], wrapper:string):string {
  const imports:string[] = components.map((component) =>
    `import ${getComponentClassName(component)} from './components/${component}/${component}';`);

  const wrapperImport:string[] = wrapper ? [`import ${CLASS_NAME_WRAPPER} from '${wrapper}';`] : [];

  const exports:string[] = [
    `export {`,
    ...components.map((component) => `  ${getComponentClassName(component)},`),
    ...(wrapper ? [`  ${CLASS_NAME_WRAPPER}`] : []),
    `};`,
  ];

  return [...imports, ...wrapperImport, ...exports].join('\n');
}

function getNamedExportsFileString(components:string[], wrapper:string):string {
  const exports:string[] = components.map((component) =>
    `export { ${getComponentClassName(component)} } from './components/${component}';`);

  const wrapperExport:string[] = wrapper ? [`export { ${CLASS_NAME_WRAPPER} } from '${wrapper}';`] : [];

  return [...exports, ...wrapperExport].join('\n');
}

function getFileString(components:string[], wrapper:string, mode:string = MODE_DEFAULT_EXPORTS):string {
  if (mode === MODE_NAMED_EXPORTS) {
    return getNamedExportsFileString(components, wrapper);
  }

  return getDefaultExportsFileString(components, wrapper);
}

export function createComponentsLibrary(components:string[], wrapper:string):Promise<void> {
  return new Promise((resolve, reject) => {
    writeFile('src/components.js', getFileString(components, wrapper), 'utf8', (error) => {
      if (error) {
        return reject(error.message);
      }

      resolve();
    });
  });
}
