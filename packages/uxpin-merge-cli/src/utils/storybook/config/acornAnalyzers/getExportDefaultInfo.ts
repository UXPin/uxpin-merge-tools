import { ExportDefaultDeclaration, Identifier, Literal, Property } from 'acorn-loose';

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
        if (isTitle(prop.key) && isLiteral(prop.value)) {
          storiesTitle = (prop.value as Literal).value;
        } else if (isComponent(prop.key) && isIdentifier(prop.value)) {
          storiesComponent = (prop.value as Identifier).name;
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

function isTitle(key:Identifier):boolean {
  return key.name === 'title';
}

function isComponent(key:Identifier):boolean {
  return key.name === 'component';
}

function isLiteral(value:Literal|Identifier):boolean {
  return value.type === 'Literal';
}

function isIdentifier(value:Literal|Identifier):boolean {
  return value.type === 'Identifier';
}
