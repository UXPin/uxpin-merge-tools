import * as ts from 'typescript';
import { TSSerializationContext } from '../context/getSerializationContext';
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
    } else if (ts.isVariableStatement(node) &&
               ts.isArrowFunction(node.declarationList.declarations[0].initializer as ts.ArrowFunction) &&
               isDefaultExported(node.declarationList.declarations[0].initializer as ts.ArrowFunction, context)
               ) {
      result = node.declarationList.declarations[0].initializer as ts.ArrowFunction;
    }
  });
  return result;
}
