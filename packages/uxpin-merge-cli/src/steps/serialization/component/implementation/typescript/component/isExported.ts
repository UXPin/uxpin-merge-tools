import * as ts from 'typescript';
import { ComponentDeclaration } from './getPropsTypeAndDefaultProps';

export function isExported(node: ComponentDeclaration | ts.VariableStatement): boolean {
  if (!node.modifiers) {
    return false;
  }
  return node.modifiers.some((m) => m.kind === ts.SyntaxKind.ExportKeyword);
}
