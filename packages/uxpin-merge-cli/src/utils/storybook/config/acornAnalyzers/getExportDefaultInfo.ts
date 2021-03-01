import { ExportDefaultDeclaration, Property } from 'acorn-loose';

export interface ExportDefaultInfo {
  title:string;
  localComponentName:string;
}

export function getExportDefaultInfo(node:ExportDefaultDeclaration):ExportDefaultInfo {
  let storiesTitle:string = '';
  let storiesComponent:string = '';

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

  return {
    localComponentName: storiesComponent,
    title: storiesTitle,
  };
}
