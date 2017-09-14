import { writeFile } from 'fs';

const MODE_DEFAULT_EXPORTS:string = 'modeDefaultExports';
const MODE_NAMED_EXPORTS:string = 'modeNamedExports';

function getComponentClassName(componentName:string):string {
  return componentName.split('-').map((part) => part[0].toUpperCase() + part.slice(1)).join('');
}

function getDefaultExportsFileString(components:string[]):string {
  const imports:string = components.map((component) =>
    `import ${getComponentClassName(component)} from './components/${component}/${component}';`).join('\n');

  const exports:string = [
    `export {`,
    ...components.map((component) => `  ${getComponentClassName(component)},`),
    `};`,
  ].join('\n');

  return [imports, exports].join('\n\n');
}

function getNamedExportsFileString(components:string[]):string {
  return components.map((component) =>
    `export { ${getComponentClassName(component)} } from './components/${component}';`).join('\n');
}

function getFileString(components:string[], mode:string = MODE_DEFAULT_EXPORTS):string {
  if (mode === MODE_NAMED_EXPORTS) {
    return getNamedExportsFileString(components);
  }

  return getDefaultExportsFileString(components);
}

export function createComponentsLibrary(components:string[]):Promise<void> {
  return new Promise((resolve, reject) => {
    writeFile('src/components.js', getFileString(components), 'utf8', (error) => {
      if (error) {
        return reject(error.message);
      }

      resolve();
    });
  });
}
