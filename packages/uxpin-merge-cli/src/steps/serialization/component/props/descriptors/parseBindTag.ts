import { CustomDescriptorsTags } from '../../implementation/ComponentPropertyDefinition';
import { ParsedPropertyDescriptor } from '../../implementation/ParsedPropertyDescriptor';

export function parseBindTag(targetPropName:string, value:string):ParsedPropertyDescriptor {
  const [sourcePropName, optionalPath] = value.split(' ');
  return {
    sourcePropName,
    sourceValuePath: optionalPath || '0',
    targetPropName,
    type: CustomDescriptorsTags.BIND,
  };
}
