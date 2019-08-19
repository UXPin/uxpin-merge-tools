import { getLines } from '../../comments/getLines';
import { ComponentPropertyCustomDescriptors } from '../../implementation/ComponentPropertyDefinition';

export function parseNameTag(value:string):Pick<ComponentPropertyCustomDescriptors, 'customName'> | undefined {
  const customName:string = getLines(value)[0];
  if (!customName) {
    return;
  }

  return {
    customName,
  };
}
