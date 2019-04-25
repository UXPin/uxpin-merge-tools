import * as ts from 'typescript';
import { PropertyType } from '../../../../ComponentPropertyDefinition';

export function serializeAsUnsupportedType(declaration:ts.Type):PropertyType<'unsupported'> {
  return {
    name: 'unsupported',
    structure: {
      raw: declaration.flags.toString(),
    },
  };
}
