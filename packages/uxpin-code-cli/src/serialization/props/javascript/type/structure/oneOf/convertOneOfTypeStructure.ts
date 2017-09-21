import { PropertyType, UnionTypeStructure } from '../../../../ComponentPropertyDefinition';

const LITERAL_TYPE_REGEX:RegExp = /^['"]([a-zA-Z]+)['"]$/;

export function convertOneOfTypeStructure(typeStructure:any):UnionTypeStructure {
  return { elements: typeStructure.map(convertUnionSegment).filter(Boolean) };
}

function convertUnionSegment({ value }:{ value:string }):PropertyType<'literal'> | null {
  const literalValue:RegExpMatchArray | null = value.match(LITERAL_TYPE_REGEX);
  if (literalValue && literalValue[1]) {
    return { name: 'literal', structure: { value: literalValue[1] } };
  }
  return null;
}
