import { PropertyType } from '../../../../ComponentPropertyDefinition';

export const TYPES_MAP:{ [typeName:string]:PropertyType } = {
  Array: { name: 'array', structure: {} },
  ReactElement: { name: 'element', structure: {} },
  ReactNode: { name: 'node', structure: {} },
};
