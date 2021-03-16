import * as ts from 'typescript';
import { TSSerializationContext } from '../context/getSerializationContext';
import { isArrowFunction } from './isArrowFunction';
import { isDefaultExported } from './isDefaultExported';

export function findDefaultExportedArrowFunction(context:TSSerializationContext):ts.ArrowFunction | undefined {
  let result:ts.ArrowFunction | undefined;
  ts.forEachChild(context.file, (node) => {
    // Nameless Arrow Function:
    //     export default () => {};
    if (ts.isExportAssignment(node) && ts.isArrowFunction(node.expression)) {
      result = node.expression;

    // Named Arrow Function:
    //     const Foo = () => {};
    //     export default Foo;
    } else if (isNamedArrowFunctionWithDefaultExport(context, node)) {
      result = (node as ts.VariableStatement).declarationList.declarations[0].initializer as ts.ArrowFunction;
    }
  });
  return result;
}

function isNamedArrowFunctionWithDefaultExport(context:TSSerializationContext, node:any):boolean {
  return (
    isArrowFunction(node) &&
    isDefaultExported(
      node.declarationList.declarations[0].initializer as ts.ArrowFunction as ts.ArrowFunction, context)
  );
}
