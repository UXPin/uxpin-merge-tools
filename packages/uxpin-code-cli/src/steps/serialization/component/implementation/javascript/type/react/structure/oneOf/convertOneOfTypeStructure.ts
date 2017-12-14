import { PropItemType } from 'react-docgen-typescript/lib';
import { PropertyType, UnionTypeStructure } from '../../../../../ComponentPropertyDefinition';
import { convertPropertyType } from '../../convertPropertyType';

const LITERAL_TYPE_REGEX:RegExp = /^['"]([^"']+)['"]$/;
type ReactDocgenUnionTypeStructure = PropItemType | LiteralType;

interface LiteralType {
  computed:false;
  value:string;
}

export function convertOneOfTypeStructure(typeStructure:ReactDocgenUnionTypeStructure[]):UnionTypeStructure {
  return { elements: typeStructure.map(convertUnionSegment).filter(Boolean) as PropertyType[] };
}

function convertUnionSegment(typeStructure:ReactDocgenUnionTypeStructure):PropertyType | null {
  if (typeStructure.hasOwnProperty('computed') && !(typeStructure as LiteralType).computed) {
    return convertLiteralUnionSegment(typeStructure as LiteralType);
  } else {
    return convertPropertyType(typeStructure as PropItemType);
  }
}

function convertLiteralUnionSegment({ value }:LiteralType):PropertyType<'literal'> | null {
  const literalValue:RegExpMatchArray | null = value.match(LITERAL_TYPE_REGEX);
  if (literalValue && literalValue[1]) {
    return { name: 'literal', structure: { value: literalValue[1] } };
  }
  return null;
}
