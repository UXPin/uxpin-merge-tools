import * as ts from 'typescript';
import { FunctionalComponentDeclaration } from './getPropsTypeAndDefaultProps';

export function isFunctionalComponentDeclaration(node: ts.Node): node is FunctionalComponentDeclaration {
  return ts.isFunctionDeclaration(node) || ts.isArrowFunction(node);
}
