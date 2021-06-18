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

  // (props:Props) => {}
  if (func.parameters[0]?.type) {
    return func.parameters[0]?.type;
  }

  // React.forwardRef<HTMLElementProps, Props>((props) => {})
  if (isFunctionalComponentWithReactForwardRef(func.parent)) {
    const typeArguments:ts.NodeArray<ts.TypeNode> | undefined = (func.parent as ts.CallExpression).typeArguments;

    if (typeArguments  && typeArguments[1]) {
      return typeArguments[1];
    }
  }

  const variableType:ts.TypeReferenceNode | undefined = variableDeclaration?.type as ts.TypeReferenceNode;

  // const Component:React.FC<Props> = () =>{};
  if (variableType && variableType.typeArguments && isReactFunctionComponent(variableType.typeName)) {
    return variableType.typeArguments[0];
  }

  // const Component = React.forwardRef<HTMLElementProps, Props>(() => {});
  if (variableDeclaration && isFunctionalComponentWithReactForwardRef(variableDeclaration)) {
    const typeArguments:ts.NodeArray<ts.TypeNode> | undefined = (
      variableDeclaration.initializer as ts.CallExpression
    ).typeArguments;

    if (typeArguments  && typeArguments[1]) {
      return typeArguments[1];
    }
  }

  // custom generic types
  // argument should contain props in name
  // const Component:CustomType<abc, MyProps, html> = () =>{};
  if (variableType && variableType.typeArguments) {
    const typeNode:ts.TypeNode | undefined = variableType.typeArguments.find((arg) =>
      ts.isTypeReferenceNode(arg) &&
      String((arg.typeName as ts.Identifier)?.escapedText).toLowerCase().indexOf('props') !== -1,
    );

    if (typeNode) {
      return typeNode;
    }
  }

  return variableType;
}
