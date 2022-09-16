import * as ts from 'typescript';
import { ClassComponentDeclaration } from './getPropsTypeAndDefaultProps';

export function isClassComponentDeclaration(node: ts.Node): node is ClassComponentDeclaration {
  return ts.isClassDeclaration(node) || ts.isClassExpression(node);
}
