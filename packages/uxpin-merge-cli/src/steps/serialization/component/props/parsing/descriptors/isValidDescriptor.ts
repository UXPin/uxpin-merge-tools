import { CustomDescriptorsTags } from '../../../implementation/ComponentPropertyDefinition';

export function isValidDescriptor(descriptor:any):descriptor is CustomDescriptorsTags {
  return Object.values(CustomDescriptorsTags).includes(descriptor);
}
