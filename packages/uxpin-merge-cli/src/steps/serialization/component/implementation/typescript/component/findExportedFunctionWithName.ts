import * as ts from 'typescript';
import { getNodeName } from '../node/getNodeName';
import { isExported } from './isExported';
import { isNodeExported } from './isNodeExported';

function getFunctionDeclaration(sourceFile:ts.SourceFile, functionName:string):ts.FunctionDeclaration | undefined {
  let result:ts.FunctionDeclaration | undefined;
  ts.forEachChild(sourceFile, (node) => {
    if (ts.isFunctionDeclaration(node) && getNodeName(node) === functionName) {
      result = node;
    }
  });

  return result;
}

export function findExportedFunctionWithName(
  sourceFile:ts.SourceFile,
  functionName:string,
):ts.FunctionDeclaration | undefined {
  const result:ts.FunctionDeclaration | undefined = getFunctionDeclaration(sourceFile, functionName);

  if (result && isExported(result)) {
    return result;
  }

  let isFunctionExported:boolean = false;

  ts.forEachChild(sourceFile, (node) => {
    if (!isFunctionExported) {
      isFunctionExported = isNodeExported(node, functionName);
    }
  });

  return isFunctionExported ? result : undefined;
}
