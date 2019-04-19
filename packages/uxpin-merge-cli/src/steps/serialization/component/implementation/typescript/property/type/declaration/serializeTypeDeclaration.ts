import * as ts from 'typescript';
import { PropertyType } from '../../../../ComponentPropertyDefinition';
import { serializeAsUnsupportedType } from '../node/serializeAsUnsupportedType';
import { serializeEnumDeclaration } from './serializeEnumDeclaration';

export function serializeTypeDeclaration(declaration:ts.Declaration):PropertyType {
  switch (declaration.kind) {
    case ts.SyntaxKind.EnumDeclaration:
      return serializeEnumDeclaration(declaration as ts.EnumDeclaration);
    case ts.SyntaxKind.FunctionType:
      return { name: 'func', structure: {} };
    default:
      return serializeAsUnsupportedType(declaration);
  }
}
