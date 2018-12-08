import * as ts from 'typescript';
import { isDefaultExported } from './isDefaultExported';

export function findDefaultExportedFunction(sourceFile:ts.SourceFile):ts.FunctionDeclaration | undefined {
  let result:ts.FunctionDeclaration | undefined;
  ts.forEachChild(sourceFile, (node) => {
    if (ts.isFunctionDeclaration(node) && isDefaultExported(node)) {
      result = node;
    }
  });
  return result;
}
