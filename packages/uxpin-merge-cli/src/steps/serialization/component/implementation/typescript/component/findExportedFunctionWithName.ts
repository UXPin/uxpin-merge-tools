import * as ts from 'typescript';
import { TSSerializationContext } from '../context/getSerializationContext';
import { getNodeName } from '../node/getNodeName';
import { isExported } from './isExported';
import { isNodeExported } from './isNodeExported';

function getFunctionDeclaration(
  context: TSSerializationContext,
  functionName: string
): ts.FunctionDeclaration | undefined {
  let result: ts.FunctionDeclaration | undefined;
  ts.forEachChild(context.file, (node) => {
    if (ts.isFunctionDeclaration(node) && getNodeName(node) === functionName) {
      result = node;
    }
  });

  return result;
}

export function findExportedFunctionWithName(
  context: TSSerializationContext,
  functionName: string
): ts.FunctionDeclaration | undefined {
  const result: ts.FunctionDeclaration | undefined = getFunctionDeclaration(context, functionName);

  if (result && isExported(result)) {
    return result;
  }

  let isFunctionExported = false;

  ts.forEachChild(context.file, (node) => {
    if (!isFunctionExported) {
      isFunctionExported = isNodeExported(node, functionName);
    }
  });

  return isFunctionExported ? result : undefined;
}
