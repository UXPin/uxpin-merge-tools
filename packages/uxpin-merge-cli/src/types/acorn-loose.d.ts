import('acorn');
import { Node, Options } from 'acorn';
import { parse } from 'acorn-loose';

export declare function parse(code:string, opts?:Options):ModuleNode;

export interface ModuleNode extends Node {
  body?: (ImportDeclaration|ExportDefaultDeclaration)[]
}

export interface ExportDefaultDeclaration extends Node {
  type:'ExportDefaultDeclaration';
  declaration: (ObjectExpression|Identifier)
}

export interface ImportDeclaration extends Node {
  type:'ImportDeclaration';
  specifiers: (ImportDefaultSpecifier|ImportSpecifier)[];
  source: Literal;
}

export interface ImportDefaultSpecifier extends Node {
  type:'ImportDefaultSpecifier';
  local:Identifier;
}

export interface ImportNamespaceSpecifier extends Node {
  type:'ImportNamespaceSpecifier';
  local:Identifier;
}

export interface ImportSpecifier extends Node {
  type:'ImportSpecifier';
  imported:Identifier;
  local:Identifier;
}

export interface Identifier extends Node {
  type:'Identifier';
  name:string;
}

export interface ObjectExpression extends Node {
  type:'ObjectExpression';
  properties:Property[];
}

export interface Property extends Node {
  type:'Property';
  key:Identifier;
  value:(Literal|Identifier);
}

export interface Literal extends Node {
  type:'Literal';
  value:string;
}
