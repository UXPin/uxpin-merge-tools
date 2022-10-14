import { PropertyType } from './ComponentPropertyDefinition';

export function createUnsupportedTypeDefinition(raw: string): PropertyType<'unsupported'> {
  return {
    name: 'unsupported',
    structure: { raw },
  };
}
