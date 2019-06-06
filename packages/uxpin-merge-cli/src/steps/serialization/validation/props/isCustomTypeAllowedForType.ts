import { CustomControlTypeName, PropertyTypeName } from '../../component/implementation/ComponentPropertyDefinition';

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
  [CustomControlTypeName.Select]: ['union'],
  [CustomControlTypeName.Textfield]: [
    ...ARRAY_TYPES,
    ...ELEMENT_TYPES,
    ...OBJECT_TYPES,
    'string',
  ],
};

export function isCustomTypeAllowedForType(customTypeName:CustomControlTypeName, typeName:PropertyTypeName):boolean {
  const allowed:PropertyTypeName[] | undefined = CUSTOM_TYPE_ALLOWANCE_MAP[customTypeName];

  return Array.isArray(allowed) && allowed.includes(typeName);
}
