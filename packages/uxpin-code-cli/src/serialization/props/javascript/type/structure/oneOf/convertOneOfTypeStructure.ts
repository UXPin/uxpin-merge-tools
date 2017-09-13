import { PropertyType, UnionTypeStructure } from '../../../../ComponentPropertyDefinition';

const LITERAL_TYPE_REGEX:RegExp = /^['"]([a-zA-Z]+)['"]$/;

export function convertOneOfTypeStructure(typeStructure:any):UnionTypeStructure {
  return { elements: typeStructure.map(convertUnionSegment) };
}

function convertUnionSegment(element:any):PropertyType<'literal'> | null {
  const literalValue:string | undefined = element.value.match(LITERAL_TYPE_REGEX)[1];
  if (literalValue) {
    return { name: 'literal', structure: { value: literalValue } };
  }
  return null;
}
