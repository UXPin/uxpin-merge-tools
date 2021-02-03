import { reduce } from 'lodash';
import { PropertyType } from '../../../../steps/serialization/component/implementation/ComponentPropertyDefinition';
import { getDefaultValueForPropType } from './getDefaultValueForPropType';

export function getPropTypeValue(propertyType?:PropertyType):any {
  if (!propertyType) {
    return '';
  }

  switch (propertyType.name) {
    case 'union':
      return getPropTypeValue((propertyType as PropertyType<'union'>).structure.elements[0]);
    case 'literal':
      return (propertyType as PropertyType<'literal'>).structure.value;
    case 'typedArray':
      return [getPropTypeValue((propertyType as PropertyType<'typedArray'>).structure.memberType)];
    case 'dictionary':
      return getPropTypeValue((propertyType as PropertyType<'dictionary'>).structure.valueType);
    case 'shape':
      return reduce(
        (propertyType as PropertyType<'shape'>).structure,
        (result, value, propName) => (
          Object.assign(result, { [propName]: getPropTypeValue(value) })
        ), {});
    default:
      return getDefaultValueForPropType(propertyType.name);

  }
}
