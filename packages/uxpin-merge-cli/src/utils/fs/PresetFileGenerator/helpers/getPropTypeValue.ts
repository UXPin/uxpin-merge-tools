import { reduce } from 'lodash';
import { PropertyType } from '../../../../steps/serialization/component/implementation/ComponentPropertyDefinition';
import { getDefaultValueForPropType } from './getDefaultValueForPropType';

enum TYPES {
  dictionary = 'dictionary',
  literal = 'literal',
  shape = 'shape',
  typedArray = 'typedArray',
  union = 'union',
}

export function getPropTypeValue(propertyType?: PropertyType): any {
  if (!propertyType) {
    return '';
  }

  switch (propertyType.name) {
    case TYPES.union:
      return getPropTypeValue((propertyType as PropertyType<TYPES.union>).structure.elements[0]);
    case TYPES.literal:
      return (propertyType as PropertyType<TYPES.literal>).structure.value;
    case TYPES.typedArray:
      return [getPropTypeValue((propertyType as PropertyType<TYPES.typedArray>).structure.memberType)];
    case TYPES.dictionary:
      return getPropTypeValue((propertyType as PropertyType<TYPES.dictionary>).structure.valueType);
    case TYPES.shape:
      return reduce(
        (propertyType as PropertyType<TYPES.shape>).structure,
        (result, value, propName) => Object.assign(result, { [propName]: getPropTypeValue(value) }),
        {}
      );
    default:
      return getDefaultValueForPropType(propertyType.name);
  }
}
