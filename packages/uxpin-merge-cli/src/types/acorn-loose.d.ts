import('acorn');
import { Node, Options } from 'acorn';

export declare function parse(code: string, opts?: Options): ModuleNode;

export interface ModuleNode extends Node {
  body?: (ImportDeclaration | ExportDefaultDeclaration)[];
}

export interface ExportDefaultDeclaration extends Node {
  type: 'ExportDefaultDeclaration';
  declaration: ObjectExpression | Identifier | CallExpression;
}

export interface ExportNamedDeclaration extends Node {
  type: 'ExportNamedDeclaration';
  declaration: ClassDeclaration | FunctionDeclaration | VariableDeclaration | null;
  specifiers: ExportSpecifier[];
}

export interface ImportDeclaration extends Node {
  type: 'ImportDeclaration';
  specifiers: (ImportDefaultSpecifier | ImportSpecifier)[];
  source: Literal;
}

export interface ImportDefaultSpecifier extends Node {
  type: 'ImportDefaultSpecifier';
  local: Identifier;
}

export interface ImportNamespaceSpecifier extends Node {
  type: 'ImportNamespaceSpecifier';
  local: Identifier;
}

export interface ExportSpecifier extends Node {
  type: 'ExportSpecifier';
  exported: Identifier;
  local: Identifier;
}

export interface ImportSpecifier extends Node {
  type: 'ImportSpecifier';
  imported: Identifier;
  local: Identifier;
}

export interface Identifier extends Node {
  type: 'Identifier';
  name: string;
}

export interface ObjectExpression extends Node {
  type: 'ObjectExpression';
  properties: Property[];
}

export interface Property extends Node {
  type: 'Property';
  key: Identifier;
  value: Literal | Identifier;
}

export interface Literal extends Node {
  type: 'Literal';
  value: string;
}

export interface ClassDeclaration extends Node {
  type: 'ClassDeclaration';
  id: Identifier;
}

export interface FunctionDeclaration extends Node {
  type: 'FunctionDeclaration';
  id: Identifier;
}

export interface VariableDeclaration extends Node {
  type: 'VariableDeclaration';
  declarations: VariableDeclarator[];
}

export interface VariableDeclarator extends Node {
  type: 'VariableDeclarator';
  id: Identifier;
}

export interface CallExpression extends Node {
  type: 'CallExpression';
  arguments: (Identifier | CallExpression)[];
}
