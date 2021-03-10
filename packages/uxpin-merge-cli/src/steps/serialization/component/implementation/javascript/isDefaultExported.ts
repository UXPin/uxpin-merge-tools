import {
  ClassDeclaration,
  ExportDefaultDeclaration,
  ExportNamedDeclaration,
  ExportSpecifier,
  ImportDeclaration,
  ModuleNode,
  parse,
  VariableDeclaration,
  VariableDeclarator,
} from 'acorn-loose';
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

    // e.g. export { Component }
    if (node.declaration === null) {
      return node.specifiers.some((specifier:ExportSpecifier) => {
        return specifier.exported.name === name;
      });
    }

    // e.g. export class Component
    if (isClassDeclaration(node.declaration)) {
      return (node.declaration as ClassDeclaration).id.name === name;
    }

    // e.g. export const Component = ...
    if (isVariableDeclaration(node.declaration)) {
      return (node.declaration as VariableDeclaration).declarations.some((variableDeclarator:VariableDeclarator) => {
        return variableDeclarator.id.name === name;
      });
    }

    return false;
  });

  return !isNamedExported;
}

function isClassDeclaration(node:ClassDeclaration|VariableDeclaration):boolean {
  return node.type === 'ClassDeclaration';
}

function isVariableDeclaration(node:ClassDeclaration|VariableDeclaration):boolean {
  return node.type === 'VariableDeclaration';
}
