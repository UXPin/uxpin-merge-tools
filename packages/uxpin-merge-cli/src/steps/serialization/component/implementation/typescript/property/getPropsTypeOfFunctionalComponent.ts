import * as ts from 'typescript';
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

  const variableType:ts.TypeReferenceNode | undefined = variableDeclaration?.type as ts.TypeReferenceNode;
  if (variableType && variableType.typeArguments && isReactFunctionComponent(variableType.typeName)) {
    return variableType.typeArguments[0];
  }

  return variableType;
}
