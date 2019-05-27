import { ComponentPropertyCustomDescriptors } from '../../implementation/ComponentPropertyDefinition';

export function parseNameTag(value:string):Pick<ComponentPropertyCustomDescriptors, 'customName'> | undefined {
  if (!value) {
    return;
  }

  return {
    customName: value,
  };
}
