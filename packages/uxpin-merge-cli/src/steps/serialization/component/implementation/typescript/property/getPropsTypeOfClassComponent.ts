import * as ts from 'typescript';
import { ClassComponentDeclaration } from '../component/getPropsTypeAndDefaultProps';

const REACT_COMPONENT_TYPES:string[] = [
  'React.Component',
  'React.PureComponent',
];

export function getPropsTypeOfClassComponent(componentClass:ClassComponentDeclaration):ts.TypeNode | undefined {
  if (!componentClass.heritageClauses) {
    return;
  }
  return getPropsTypeNodeFromHeritageClauses(componentClass.heritageClauses);
}

function getPropsTypeNodeFromHeritageClauses(
  heritageClauses:ts.NodeArray<ts.HeritageClause>,
):ts.TypeNode | undefined {
  for (const clause of heritageClauses) {
    if (clause.token === ts.SyntaxKind.ExtendsKeyword) {
      for (const type of clause.types) {
        if (ts.isExpressionWithTypeArguments(type)
          && REACT_COMPONENT_TYPES.includes(type.expression.getText())
          && type.typeArguments) {
          return type.typeArguments[0];
        }
      }
    }
  }
  return;
}
