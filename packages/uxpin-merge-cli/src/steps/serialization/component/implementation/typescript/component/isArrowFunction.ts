import * as ts from 'typescript';
import { ComponentDeclaration } from './getPropsTypeAndDefaultProps';

export function isArrowFunction(node:ComponentDeclaration | ts.VariableStatement):boolean {
  return (
    ts.isVariableStatement(node) &&
    ts.isArrowFunction((node as ts.VariableStatement).declarationList.declarations[0].initializer as ts.ArrowFunction)
  );
}
