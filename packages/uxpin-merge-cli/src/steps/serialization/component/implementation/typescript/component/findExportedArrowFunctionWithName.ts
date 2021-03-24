import * as ts from 'typescript';
import { TSSerializationContext } from '../context/getSerializationContext';
import { getNodeName } from '../node/getNodeName';
import { isArrowFunction } from './isArrowFunction';
import { isExported } from './isExported';
import { isNodeExported } from './isNodeExported';

export function findExportedArrowFunctionWithName(
  context:TSSerializationContext,
  functionName:string,
):ts.ArrowFunction | undefined {
  let result:ts.ArrowFunction | undefined;
  let isFunctionExported:boolean = false;
  ts.forEachChild(context.file, (node) => {
    if (
      ts.isVariableStatement(node) &&
      isArrowFunction(node) &&
      getNodeName(node.declarationList.declarations[0]) === functionName
    ) {
      // export const Component = () => {}
      if (isExported(node)) { isFunctionExported = true; }
      result = node.declarationList.declarations[0].initializer as ts.ArrowFunction;
    }

    // const Component = () => {}
    // export { Component }
    if (isNodeExported(node, functionName)) {
      isFunctionExported = true;
    }
  });

  return isFunctionExported ? result : undefined;
}
