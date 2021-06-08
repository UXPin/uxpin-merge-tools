import * as ts from 'typescript';

export type ClassComponentDeclaration = ts.ClassDeclaration | ts.ClassExpression;
export type FunctionalComponentDeclaration = ts.FunctionDeclaration | ts.ArrowFunction | ts.FunctionExpression;
export type VariableDeclaration = ts.VariableDeclaration;

export type ComponentDeclaration = FunctionalComponentDeclaration | ClassComponentDeclaration | VariableDeclaration;
