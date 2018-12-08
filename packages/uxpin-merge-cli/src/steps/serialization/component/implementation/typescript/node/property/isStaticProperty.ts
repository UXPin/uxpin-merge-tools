import * as ts from 'typescript';

export function isStaticProperty(declaration:ts.PropertyDeclaration):boolean {
  if (!declaration.modifiers) {
    return false;
  }
  return !!declaration.modifiers.find((m) => m.kind === ts.SyntaxKind.StaticKeyword);
}

