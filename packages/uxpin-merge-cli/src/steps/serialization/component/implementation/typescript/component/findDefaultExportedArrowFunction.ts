import * as ts from 'typescript';

export function findDefaultExportedArrowFunction(sourceFile:ts.SourceFile):ts.ArrowFunction | undefined {
  let result:ts.ArrowFunction | undefined;
  ts.forEachChild(sourceFile, (node) => {
    if (ts.isExportAssignment(node) && ts.isArrowFunction(node.expression)) {
      result = node.expression;
    }
  });
  return result;
}
