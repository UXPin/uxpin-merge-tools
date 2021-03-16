import * as ts from 'typescript';
import { TSSerializationContext } from '../context/getSerializationContext';
import { getNodeName } from '../node/getNodeName';
import { isArrowFunction } from './isArrowFunction';
import { isExported } from './isExported';

export function findExportedArrowFunctionWithName(
  context:TSSerializationContext, componentFileName:string):ts.ArrowFunction | undefined {

  let result:ts.ArrowFunction | undefined;
  ts.forEachChild(context.file, (node) => {
    // Named Arrow Function:
    //     export const Foo = () => {};
    if (
        ts.isVariableStatement(node) &&
        isExported(node) &&
        isArrowFunction(node) &&
        getNodeName(node.declarationList.declarations[0]) === componentFileName
      ) {
      result = node.declarationList.declarations[0].initializer as ts.ArrowFunction;
      return;
    }
  });
  return result;
}
