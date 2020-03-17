import { getLines } from '../../../comments/getLines';
import { CustomDescriptorsTags } from '../../../implementation/ComponentPropertyDefinition';
import { ParsedPlainPropertyDescriptor } from '../../../implementation/ParsedPropertyDescriptor';

export function parseNameTag(value:string):ParsedPlainPropertyDescriptor | undefined {
  const customName:string = getLines(value)[0];
  if (!customName) {
    return;
  }

  return {
    serialized: {
      customName,
    },
    type: CustomDescriptorsTags.NAME,
  };
}
