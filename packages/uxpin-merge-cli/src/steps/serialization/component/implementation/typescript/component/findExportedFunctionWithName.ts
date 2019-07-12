import * as ts from 'typescript';
import { getNodeName } from '../node/getNodeName';
import { isExported } from './isExported';

export function findExportedFunctionWithName(
  sourceFile:ts.SourceFile,
  functionName:string,
):ts.FunctionDeclaration | undefined {
  let result:ts.FunctionDeclaration | undefined;
  ts.forEachChild(sourceFile, (node) => {
    if (ts.isFunctionDeclaration(node) && isExported(node) && getNodeName(node) === functionName) {
      result = node;
    }
  });
  return result;
}
