import { noop } from 'lodash';
import { PropertyTypeName } from '../../../../steps/serialization/component/implementation/ComponentPropertyDefinition';

type emptyFunction = () => void;
type DefaultValue = string | number | boolean | object | emptyFunction | null;

type GetDefaultValueForPropType = {
  [key in PropertyTypeName]: DefaultValue;
};

const propTypesToValuesMap: GetDefaultValueForPropType = {
  any: '',
  array: [],
  boolean: false,
  custom: null,
  date: new Date(),
  dictionary: null,
  element: null,
  empty: '',
  enum: null,
  func: noop,
  literal: null,
  node: '',
  number: 1,
  object: {},
  shape: {},
  string: '',
  symbol: null,
  typedArray: null,
  union: null,
  unsupported: null,
};

export function getDefaultValueForPropType(type: PropertyTypeName): DefaultValue {
  return propTypesToValuesMap[type] !== undefined ? propTypesToValuesMap[type] : null;
}
