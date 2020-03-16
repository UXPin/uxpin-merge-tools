import { CustomDescriptorsTags } from '../../implementation/ComponentPropertyDefinition';
import { ParsedPlainPropertyDescriptor } from '../../implementation/ParsedPropertyDescriptor';

export function parseDescriptionTag(
  propName:string,
  value:string):ParsedPlainPropertyDescriptor | undefined {
  if (!value) {
    return;
  }

  return {
    propName,
    serialized: {
      customDescription: value,
    },
    type: CustomDescriptorsTags.DESCRIPTION,
  };
}
