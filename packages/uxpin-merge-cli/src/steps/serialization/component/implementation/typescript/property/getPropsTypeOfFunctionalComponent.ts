import * as ts from 'typescript';
import { FunctionalComponentDeclaration } from '../component/getPropsTypeAndDefaultProps';

export function getPropsTypeOfFunctionalComponent(func:FunctionalComponentDeclaration):ts.TypeNode | undefined {
  if (!func.parameters || !func.parameters[0] || !func.parameters[0].type) {
    return;
  }
  return func.parameters[0].type;
}
