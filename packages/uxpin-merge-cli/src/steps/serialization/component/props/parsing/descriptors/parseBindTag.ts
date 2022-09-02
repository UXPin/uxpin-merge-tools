import { CustomDescriptorsTags } from '../../../implementation/ComponentPropertyDefinition';
import { ParsedPropertyDescriptor } from '../../../implementation/ParsedPropertyDescriptor';

export function parseBindTag(value: string): ParsedPropertyDescriptor {
  const [firstLine] = value.split('\n');
  const [sourcePropName, optionalPath] = firstLine.split(' ');
  return {
    serialized: {
      isAutoUpdated: true,
    },
    sourcePropName,
    sourceValuePath: optionalPath || '0',
    type: CustomDescriptorsTags.BIND,
  };
}
