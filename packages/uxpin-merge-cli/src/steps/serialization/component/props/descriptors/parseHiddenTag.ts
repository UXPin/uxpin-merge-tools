import { CustomDescriptorsTags } from '../../implementation/ComponentPropertyDefinition';
import { ParsedPlainPropertyDescriptor } from '../../implementation/ParsedPropertyDescriptor';

export function parseHiddenTag(propName:string):ParsedPlainPropertyDescriptor {
  return {
    propName,
    serialized: {
      hidden: true,
    },
    type: CustomDescriptorsTags.HIDDEN,
  };
}
