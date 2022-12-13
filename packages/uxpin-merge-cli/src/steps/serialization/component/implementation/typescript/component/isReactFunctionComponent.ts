import * as ts from 'typescript';

export function isReactFunctionComponent(typeName: ts.EntityName): boolean {
  if (ts.isIdentifier(typeName)) {
    return ['FC', 'FunctionComponent'].includes(typeName.escapedText as string);
  }

  if (ts.isIdentifier(typeName.left) && ts.isIdentifier(typeName.right)) {
    return typeName.left.escapedText === 'React' && isReactFunctionComponent(typeName.right);
  }

  return false;
}
