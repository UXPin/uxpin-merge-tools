import * as ts from 'typescript';
import { TSSerializationContext } from '../context/getSerializationContext';
import { isDefaultExported } from './isDefaultExported';

export function findDefaultExportedFunction(context: TSSerializationContext): ts.FunctionDeclaration | undefined {
  let result: ts.FunctionDeclaration | undefined;
  // e.g. export default function()
  ts.forEachChild(context.file, (node) => {
    if (ts.isFunctionDeclaration(node) && isDefaultExported(node, context)) {
      result = node;
    }
  });
  return result;
}
