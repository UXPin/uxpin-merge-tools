import * as ts from 'typescript';

export function isPrivateProperty(declaration:ts.PropertyDeclaration):boolean {
  if (!declaration.modifiers) {
    return false;
  }
  return !!declaration.modifiers.find((m) => m.kind === ts.SyntaxKind.PrivateKeyword);
}
