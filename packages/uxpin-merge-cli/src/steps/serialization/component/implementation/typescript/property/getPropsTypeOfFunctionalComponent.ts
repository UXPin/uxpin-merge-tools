import * as ts from 'typescript';
import { isFunctionalComponentWithReactForwardRef } from '../component/isFunctionalComponentWithReactForwardRef';
import { isReactFunctionComponent } from '../component/isReactFunctionComponent';

export function getPropsTypeOfFunctionalComponent(
  func:ts.FunctionLikeDeclaration,
  variableDeclaration?:ts.VariableDeclaration,
):ts.TypeNode | undefined {
  if (!func.parameters && !variableDeclaration) {
    return;
  }

  if (func.parameters[0]?.type) {
    return func.parameters[0]?.type;
  }

  if (isFunctionalComponentWithReactForwardRef(func.parent)) {
    const typeArguments:ts.NodeArray<ts.TypeNode> | undefined = (func.parent as ts.CallExpression).typeArguments;

    if (typeArguments  && typeArguments[1]) {
      return typeArguments[1];
    }
  }

  const variableType:ts.TypeReferenceNode | undefined = variableDeclaration?.type as ts.TypeReferenceNode;

  if (variableType && variableType.typeArguments && isReactFunctionComponent(variableType.typeName)) {
    return variableType.typeArguments[0];
  }

  if (variableDeclaration && isFunctionalComponentWithReactForwardRef(variableDeclaration)) {
    const typeArguments:ts.NodeArray<ts.TypeNode> | undefined = (
      variableDeclaration.initializer as ts.CallExpression
    ).typeArguments;

    if (typeArguments  && typeArguments[1]) {
      return typeArguments[1];
    }
  }

  return variableType;
}
