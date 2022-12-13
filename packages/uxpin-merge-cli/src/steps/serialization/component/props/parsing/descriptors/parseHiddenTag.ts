import { CustomDescriptorsTags } from '../../../implementation/ComponentPropertyDefinition';
import { ParsedPlainPropertyDescriptor } from '../../../implementation/ParsedPropertyDescriptor';

export function parseHiddenTag(): ParsedPlainPropertyDescriptor {
  return {
    serialized: {
      hidden: true,
    },
    type: CustomDescriptorsTags.HIDDEN,
  };
}
