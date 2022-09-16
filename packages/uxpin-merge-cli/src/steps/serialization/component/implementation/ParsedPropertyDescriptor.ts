import { ComponentPropertyCustomDescriptors, CustomDescriptorsTags } from './ComponentPropertyDefinition';

export type ParsedPropertyDescriptor = ParsedBindingDescriptor | ParsedPlainPropertyDescriptor;

export interface ParsedPlainPropertyDescriptor {
  type: CustomDescriptorsTags;
  serialized: ComponentPropertyCustomDescriptors;
}

export interface ParsedBindingDescriptor extends ParsedPlainPropertyDescriptor {
  type: CustomDescriptorsTags.BIND;
  sourcePropName: string;
  sourceValuePath: string;
}

export function isBindingDescriptor(d: ParsedPropertyDescriptor): d is ParsedBindingDescriptor {
  return d.type === CustomDescriptorsTags.BIND;
}
