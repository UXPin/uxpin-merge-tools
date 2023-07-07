import {
  CallExpression,
  ClassDeclaration,
  ExportDefaultDeclaration,
  ExportNamedDeclaration,
  ExportSpecifier,
  ExpressionStatement,
  FunctionDeclaration,
  Identifier,
  ImportDeclaration,
  ModuleNode,
  ObjectExpression,
  parse,
  VariableDeclaration,
  VariableDeclarator,
} from 'acorn-loose';
import { readFileSync } from 'fs-extra';

// This function is checking if component is default exported by
// checking if component is not named exported.
// We are doing this way because there could be multiple components in a single.
// e.g.
// `ButtonDefault` is exported as default, but `ButtonSecondary` is exported as named.
export function isDefaultExported(componentPath: string, name: string): boolean {
  const content: string = readFileSync(componentPath, { encoding: 'utf8' });
  const ast: ModuleNode = parse(content, { sourceType: 'module', ecmaVersion: 2020 });
  if (!ast.body) {
    return false;
  }

  type nodeTypes = ExportDefaultDeclaration | ExportNamedDeclaration | ImportDeclaration | ExpressionStatement;
  let isNamedExported = false;
  let exportDefaultDeclaration: ExportDefaultDeclaration | undefined;

  ast.body.forEach((node: nodeTypes) => {
    if (node.type === 'ExportDefaultDeclaration') {
      exportDefaultDeclaration = node;
      return;
    }

    if (node.type !== 'ExportNamedDeclaration') {
      return;
    }

    // e.g. export { Component }
    // NOTE: if an export statement is like `export { Component as default }`,
    // the specifier will look like something below
    // Node {
    //   type: 'ExportSpecifier',
    //   start: 11128,
    //   end: 11145,
    //   local: Node {
    //     type: 'Identifier',
    //     start: 11128,
    //     end: 11134,
    //     name: 'Component'
    //   },
    //   exported: Node {
    //     type: 'Identifier',
    //     start: 11138,
    //     end: 11145,
    //     name: 'default'
    //   }
    // },
    // Thus, as long as exported.name === name, it is named exported.
    if (node.declaration === null) {
      isNamedExported = node.specifiers.some((specifier: ExportSpecifier) => {
        return specifier.exported.name === name;
      });
      return;
    }

    // e.g. export class Component
    if (isClassDeclaration(node.declaration)) {
      isNamedExported = (node.declaration as ClassDeclaration).id.name === name;
      return;
    }

    // e.g. export function Component
    if (isFunctionDeclaration(node.declaration)) {
      isNamedExported = (node.declaration as FunctionDeclaration).id.name === name;
      return;
    }

    // e.g. export const Component = ...
    if (isVariableDeclaration(node.declaration)) {
      isNamedExported = (node.declaration as VariableDeclaration).declarations.some(
        (variableDeclarator: VariableDeclarator) => {
          return variableDeclarator.id.name === name;
        }
      );
      return;
    }
  });

  // e.g.
  // /**
  //  * @uxpincomponent
  //  */
  // export function Component()|class Component
  // export default HOC(Component);
  if (exportDefaultDeclaration && isCallExpression(exportDefaultDeclaration.declaration)) {
    isNamedExported = !isWrappedWithHOC(name, exportDefaultDeclaration.declaration as CallExpression);
  }

  return !isNamedExported;
}

function isClassDeclaration(node: ClassDeclaration | VariableDeclaration | FunctionDeclaration): boolean {
  return node.type === 'ClassDeclaration';
}

function isFunctionDeclaration(node: ClassDeclaration | VariableDeclaration | FunctionDeclaration): boolean {
  return node.type === 'FunctionDeclaration';
}

function isVariableDeclaration(node: ClassDeclaration | VariableDeclaration | FunctionDeclaration): boolean {
  return node.type === 'VariableDeclaration';
}

function isCallExpression(node: ObjectExpression | Identifier | CallExpression): boolean {
  return node.type === 'CallExpression';
}

function isWrappedWithHOC(name: string, expression?: CallExpression): boolean {
  if (!expression) {
    return false;
  }

  return (
    expression.arguments &&
    expression.arguments.some((node) => {
      if (isCallExpression(node)) {
        return isWrappedWithHOC(name, node as CallExpression);
      }
      return node.type === 'Identifier' && node.name === name;
    })
  );
}
