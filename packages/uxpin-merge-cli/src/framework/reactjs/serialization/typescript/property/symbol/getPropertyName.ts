import * as ts from 'typescript';
import { getNodeName } from '../../../../../../steps/serialization/component/implementation/typescript/node/getNodeName';
import { ReactPropertySymbol } from './ReactPropertySymbol';

export function getPropertyName(methodSymbol:ReactPropertySymbol):string | undefined {
  const nodeName:ts.__String | undefined = getNodeName(methodSymbol.valueDeclaration);
  return nodeName && nodeName.toString();
}
