import { ExportDefaultDeclaration, ExportNamedDeclaration, ExportSpecifier, ImportDeclaration, ModuleNode, parse, VariableDeclaration, VariableDeclarator } from 'acorn-loose';
import { readFileSync } from 'fs-extra';

// This function is checking if component is default exported by
// checking if component is not named exported.
// We are doing this way because there could be multiple components in a single.
// to handle a scenario like following...
// `ButtonDefault` is exported as default, but `ButtonSecondary` is exported as named
export function isDefaultExported(componentPath:string, name:string):boolean {
  const content:string = readFileSync(componentPath, { encoding: 'utf8' });
  const ast:ModuleNode = parse(content, { sourceType: 'module', ecmaVersion: 2020 });
  if (!ast.body) { return false; }

  type nodeTypes = ExportDefaultDeclaration|ExportNamedDeclaration|ImportDeclaration;
  const isNamedExported:boolean = ast.body.some((node:nodeTypes) => {
    if (node.type !== 'ExportNamedDeclaration') { return false; }

    // e.g. export const Component = ...
    if (isVariableDeclaration(node)) {
      return (node.declaration as VariableDeclaration).declarations.some((variableDeclarator:VariableDeclarator) => {
        return variableDeclarator.id.name === name;
      });
    }

    // e.g. export { Component }
    return node.specifiers.some((specifier:ExportSpecifier) => {
      return specifier.exported.name === name;
    });
  });

  return !isNamedExported;
}

function isVariableDeclaration(node:ExportNamedDeclaration):boolean {
  return node.declaration !== null;
}
