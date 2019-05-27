import { ComponentPropertyCustomDescriptors } from '../../implementation/ComponentPropertyDefinition';

export function parseHiddenTag():Pick<ComponentPropertyCustomDescriptors, 'hidden'> {
  return {
    hidden: true,
  };
}
