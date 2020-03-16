import { ComponentPropertyCustomDescriptors, CustomDescriptorsTags } from './ComponentPropertyDefinition';

export type ParsedPropertyDescriptor =
  | ParsedAutoUpdateDescriptor
  | ParsedPlainPropertyDescriptor;

export type PlainPropertyDescriptorType =
  | CustomDescriptorsTags.DESCRIPTION
  | CustomDescriptorsTags.HIDDEN
  | CustomDescriptorsTags.NAME
  | CustomDescriptorsTags.TYPE;

export interface ParsedPlainPropertyDescriptor {
  propName:string;
  type:PlainPropertyDescriptorType;
  serialized:ComponentPropertyCustomDescriptors;
}

export interface ParsedAutoUpdateDescriptor {
  type:CustomDescriptorsTags.BIND;
  sourcePropName:string;
  targetPropName:string;
  sourceValuePath:string;
}
