import { PropItemType } from 'react-docgen-typescript/lib';
import { PropertyType, UnionTypeStructure } from '../../../../../ComponentPropertyDefinition';
import { convertLiteralUnionSegment } from '../../../../../types/union/convertLiteralUnionSegment';
import { convertPropertyType } from '../../convertPropertyType';

type ReactDocgenUnionTypeStructure = PropItemType | LiteralType;

interface LiteralType {
  computed: false;
  value: string;
}

export function convertOneOfTypeStructure(typeStructure: ReactDocgenUnionTypeStructure[]): UnionTypeStructure {
  return { elements: typeStructure.map(convertUnionSegment).filter(Boolean) as PropertyType[] };
}

function convertUnionSegment(typeStructure: ReactDocgenUnionTypeStructure): PropertyType | null {
  if (typeStructure.hasOwnProperty('computed') && !(typeStructure as LiteralType).computed) {
    return convertLiteralUnionSegment((typeStructure as LiteralType).value);
  }
  return convertPropertyType(typeStructure as PropItemType);
}
