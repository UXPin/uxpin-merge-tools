import { CustomDescriptorsTags } from '../../../implementation/ComponentPropertyDefinition';
import { ParsedPlainPropertyDescriptor } from '../../../implementation/ParsedPropertyDescriptor';

export function parseDescriptionTag(value: string): ParsedPlainPropertyDescriptor | undefined {
  if (!value) {
    return;
  }

  return {
    serialized: {
      customDescription: value,
    },
    type: CustomDescriptorsTags.DESCRIPTION,
  };
}
