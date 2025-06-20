import { ParsedPlainPropertyDescriptor } from '../../../implementation/ParsedPropertyDescriptor';
import { getLines } from '../../../comments/getLines';
import { CustomDescriptorsTags } from '../../../implementation/ComponentPropertyDefinition';

export function parseDynamicOptions(value: string): ParsedPlainPropertyDescriptor | undefined {
  return {
    serialized: {
      conditionalFn: value,
    },
    type: CustomDescriptorsTags.DYNAMIC_OPTIONS,
  };
}
