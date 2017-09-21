import { PropItemType } from 'react-docgen-typescript/lib';
import { PropertyType, PropertyTypeName } from '../../ComponentPropertyDefinition';
import { convertTypeName } from './convertTypeName';
import { convertTypeStructure } from './structure/convertTypeStructure';

export function convertPropertyType(propType:PropItemType):PropertyType {
  const propTypeName:PropertyTypeName = convertTypeName(propType.name);
  return {
    name: propTypeName,
    structure: convertTypeStructure(propTypeName, propType.value),
  };
}
