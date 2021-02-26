import { ExportDefaultDeclaration, ImportDeclaration, ModuleNode, parse, Property } from 'acorn-loose';
import { readFileSync } from 'fs-extra';
import { isEmpty } from 'lodash';

export interface StoriesInfo {
  title:string;
  component:string;
  componentFilePath:string; // relative from stories path
  importDefault:boolean;
  storiesPath:string; // absolute path
}

interface ImportedModules {
  [localName:string]:ImportedModule;
}

interface ImportedModule {
  componentFilePath:string;
  importDefault:boolean;
}

export function getStoriesInfo(storiesPath:string):StoriesInfo | null {
  let storiesTitle:string = '';
  let storiesComponent:string = '';
  const imports:ImportedModules = {};

  const content:string = readFileSync(storiesPath, { encoding: 'utf8' });
  const ast:ModuleNode = parse(content, { sourceType: 'module', ecmaVersion: 2020 });

  if (ast.body && ast.body.length > 0) {
    ast.body.forEach((node:(ExportDefaultDeclaration|ImportDeclaration)) => {
      // default export that describes component
      switch (node.type) {
        case 'ExportDefaultDeclaration':
          switch (node.declaration.type) {
            case 'ObjectExpression':
              node.declaration.properties.forEach((prop:Property) => {
                if (prop.key.name === 'title' && prop.value.type === 'Literal') {
                  storiesTitle = prop.value.value;
                } else if (prop.key.name === 'component' && prop.value.type === 'Identifier') {
                  storiesComponent = prop.value.name;
                }
              });
              break;
            // case 'Identifier': @todo support a case like `export default variable;`
          }
          break;

        // Detect component import name/path
        case 'ImportDeclaration':
          let importDefault:boolean = false;
          let localName:string;
          // TS has issue with analyzing type, so setting ImportDeclaration explicitely
          (node as ImportDeclaration).specifiers.forEach((specifier:any) => {
            switch (specifier.type) {
              case 'ImportDefaultSpecifier':
                importDefault = true;
                break;

              case 'ImportSpecifier':
                importDefault = false;
                break;
            }

            localName = specifier.local.name;
            const importedModule:ImportedModule = {
              componentFilePath: (node as ImportDeclaration).source.value,
              importDefault,
            };
            imports[localName] = importedModule;
          });
          break;
      }
    });
  }

  // We only support stories.js file defining default export
  // with both `title` and `component` attributes.
  if (isEmpty(storiesTitle) || isEmpty(storiesComponent)) {
    return null;
  }

  const storiesInfo:StoriesInfo = {
    component: storiesComponent,
    componentFilePath: imports[storiesComponent].componentFilePath,
    importDefault: imports[storiesComponent].importDefault,
    storiesPath,
    title: storiesTitle,
  };
  return storiesInfo;
}
