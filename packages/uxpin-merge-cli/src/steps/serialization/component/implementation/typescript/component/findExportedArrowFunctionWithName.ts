import * as ts from 'typescript';
import { TSSerializationContext } from '../context/getSerializationContext';
import { getNodeName } from '../node/getNodeName';
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
        node.declarationList.declarations[0].initializer &&
        ts.isArrowFunction(node.declarationList.declarations[0].initializer) &&
        getNodeName(node.declarationList.declarations[0]) === componentFileName
      ) {
      result = node.declarationList.declarations[0].initializer;
      return;
    }
  });
  return result;
}
