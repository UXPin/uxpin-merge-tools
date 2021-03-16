import * as ts from 'typescript';
import { ComponentDeclaration } from './getPropsTypeAndDefaultProps';
import { isExported } from './isExported';

export function withDefaultExportKeyword(node:ComponentDeclaration):boolean {
  if (!node.modifiers) {
    return false;
  }
  const isDefault:boolean = node.modifiers.some((m) => m.kind === ts.SyntaxKind.DefaultKeyword);
  return isExported(node) && isDefault;
}