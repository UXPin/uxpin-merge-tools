import { getNodeName } from '../../node/getNodeName';
import { ReactPropertySymbol } from './ReactPropertySymbol';

export function getPropertyName(methodSymbol:ReactPropertySymbol):string {
  return getNodeName(methodSymbol.valueDeclaration)!.toString();
}
