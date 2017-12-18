import { PropertyType } from '../../ComponentPropertyDefinition';

const LITERAL_TYPE_REGEX:RegExp = /^['"]([^"']+)['"]$/;

export function convertLiteralUnionSegment(value:string):PropertyType<'literal'> | null {
  const literalValue:RegExpMatchArray | null = value.match(LITERAL_TYPE_REGEX);
  if (literalValue && literalValue[1]) {
    return { name: 'literal', structure: { value: literalValue[1] } };
  }
  return null;
}
