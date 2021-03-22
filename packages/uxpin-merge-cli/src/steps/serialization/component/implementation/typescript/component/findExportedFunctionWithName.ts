import * as ts from 'typescript';
import { TSSerializationContext } from '../context/getSerializationContext';
import { getNodeName } from '../node/getNodeName';
import { isExported } from './isExported';

export function findExportedFunctionWithName(
  context:TSSerializationContext,
  functionName:string,
):ts.FunctionDeclaration | undefined {
  let result:ts.FunctionDeclaration | undefined;
  ts.forEachChild(context.file, (node) => {
    if (ts.isFunctionDeclaration(node) && isExported(node) && getNodeName(node) === functionName) {
      result = node;
    }
  });
  return result;
}
