import * as ts from 'typescript';

export function findDefaultExportedArrowFunction(sourceFile:ts.SourceFile):ts.ArrowFunction | undefined {
  let result:ts.ArrowFunction | undefined;
  ts.forEachChild(sourceFile, (node) => {
    // Nameless Arrow Function
    //     export default () => {};
    if (ts.isExportAssignment(node) && ts.isArrowFunction(node.expression)) {
      result = node.expression;
    }
    // Named Arrow Function:
    //     const Foo = () => {};
    //     export default Foo;
    else if(ts.isVariableStatement(node) && ts.isArrowFunction(node.declarationList.declarations[0].initializer as ts.ArrowFunction)) {
      let arrowFunctionName:any = node.declarationList.declarations[0].name;
      ts.forEachChild(sourceFile, (statement:any) => {
        // Did they add an ExportAssignment(252) with the same name as their ArrowFunction?
        if (statement.kind == 252 && statement.expression.escapedText == arrowFunctionName.escapedText) {
          result = node.declarationList.declarations[0].initializer as ts.ArrowFunction;
        }
      });
    }
  });
  return result;
}
