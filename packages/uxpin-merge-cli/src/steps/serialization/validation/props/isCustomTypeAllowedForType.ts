import { uniq } from 'lodash';
import {
  CustomControlType,
  CustomControlTypeName,
  PropertyType,
  PropertyTypeName,
} from '../../component/implementation/ComponentPropertyDefinition';

const ARRAY_TYPES:PropertyTypeName[] = ['array', 'typedArray'];
const OBJECT_TYPES:PropertyTypeName[] = ['custom', 'object', 'shape'];
const ELEMENT_TYPES:PropertyTypeName[] = ['element', 'node'];

const CUSTOM_TYPE_ALLOWANCE_MAP:{
  [key in CustomControlTypeName]?:PropertyTypeName[];
} = {
  [CustomControlTypeName.CodeEditor]: [
    ...ARRAY_TYPES,
    ...ELEMENT_TYPES,
    ...OBJECT_TYPES,
    'any',
    'func',
    'string',
  ],
  [CustomControlTypeName.Input]: ['string'],
  [CustomControlTypeName.Interactions]: ['func'],
  [CustomControlTypeName.Number]: ['number'],
  [CustomControlTypeName.Switcher]: ['boolean'],
  [CustomControlTypeName.Select]: ['literal'],
  [CustomControlTypeName.Textfield]: [
    ...ARRAY_TYPES,
    ...ELEMENT_TYPES,
    ...OBJECT_TYPES,
    'string',
  ],
};

export function isCustomTypeAllowedForType(customType:CustomControlType, baseType:PropertyType):boolean {
  const { name: customTypeName } = customType;
  const { name: baseTypeName } = baseType;

  if (baseTypeName === 'union') {
    return isCustomTypeAllowedForUnionType(customType, baseType as PropertyType<'union'>);
  }

  return isCustomTypeAllowed(customTypeName, baseTypeName);
}

function isCustomTypeAllowedForUnionType(customType:CustomControlType, baseType:PropertyType<'union'>):boolean {
  const elementsTypes:PropertyTypeName[] = baseType.structure.elements.map((type) => type.name);
  const hasSameElementsTypes:boolean = !!elementsTypes.length && uniq(elementsTypes).length === 1;

  if (hasSameElementsTypes) {
    return isCustomTypeAllowed(customType.name, elementsTypes[0]);
  }

  return elementsTypes.some((name) => isCustomTypeAllowed(customType.name, name));
}

function isCustomTypeAllowed(customTypeName:CustomControlTypeName, baseTypeName:PropertyTypeName):boolean {
  const allowed:PropertyTypeName[] | undefined = CUSTOM_TYPE_ALLOWANCE_MAP[customTypeName];

  return Array.isArray(allowed) && allowed.includes(baseTypeName);
}
