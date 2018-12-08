import * as ts from 'typescript';
import { ComponentDeclaration } from './getPropsTypeAndDefaultProps';

export function isExported(node:ComponentDeclaration):boolean {
  if (!node.modifiers) {
    return false;
  }
  return !!node.modifiers.find((m) => m.kind === ts.SyntaxKind.ExportKeyword);
}
