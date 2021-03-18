import * as ts from 'typescript';
import { ComponentDeclaration } from './getPropsTypeAndDefaultProps';

export function isArrowFunction(node:ComponentDeclaration | ts.VariableStatement):boolean {
  return (
    ts.isVariableStatement(node) &&
    node.declarationList.declarations[0] &&
    !!node.declarationList.declarations[0].initializer &&
    ts.isArrowFunction(node.declarationList.declarations[0].initializer)
  );
}
