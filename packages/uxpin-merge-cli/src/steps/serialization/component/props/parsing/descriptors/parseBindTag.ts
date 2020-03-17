import { CustomDescriptorsTags } from '../../../implementation/ComponentPropertyDefinition';
import { ParsedPropertyDescriptor } from '../../../implementation/ParsedPropertyDescriptor';

export function parseBindTag(value:string):ParsedPropertyDescriptor {
  const [sourcePropName, optionalPath] = value.split(' ');
  return {
    sourcePropName,
    sourceValuePath: optionalPath || '0',
    type: CustomDescriptorsTags.BIND,
  };
}
