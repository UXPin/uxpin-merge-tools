import * as ts from 'typescript';
import { PropertyType } from '../../../../ComponentPropertyDefinition';

export function serializeAsUnsupportedType(declaration: ts.Type): PropertyType<'unsupported'> {
  return {
    name: 'unsupported',
    structure: {
      raw: getUnsupportedTypeName(declaration.flags).toLowerCase(),
    },
  };
}

function getUnsupportedTypeName(typeFlag: number): string {
  const nameOfUnsupportedType: string | undefined = Object.keys(ts.TypeFlags).find(
    (key: string) => ts.TypeFlags[key as keyof typeof ts.TypeFlags] === typeFlag
  );

  if (nameOfUnsupportedType) {
    return nameOfUnsupportedType;
  }
  return 'unknown type';
}
