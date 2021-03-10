import * as ts from 'typescript';
import { getNodeName } from '../node/getNodeName';
import { isExported } from './isExported';

export function findExportedArrowFunctionWithName(
  sourceFile:ts.SourceFile, componentFileName:string):ts.ArrowFunction | undefined {

  let result:ts.ArrowFunction | undefined;
  ts.forEachChild(sourceFile, (node) => {
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
