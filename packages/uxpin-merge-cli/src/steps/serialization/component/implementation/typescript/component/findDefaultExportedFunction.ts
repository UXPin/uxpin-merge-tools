import * as ts from 'typescript';
import { TSSerializationContext } from '../context/getSerializationContext';
import { isExported } from './isExported';
import { withDefaultExportKeyword } from './withDefaultExportKeyword';

export function findDefaultExportedFunction(context:TSSerializationContext):ts.FunctionDeclaration | undefined {
  let result:ts.FunctionDeclaration | undefined;
  // e.g. export default function()
  ts.forEachChild(context.file, (node) => {
    if (ts.isFunctionDeclaration(node) && isExported(node) && withDefaultExportKeyword(node)) {
      result = node;
    }
  });
  return result;
}
