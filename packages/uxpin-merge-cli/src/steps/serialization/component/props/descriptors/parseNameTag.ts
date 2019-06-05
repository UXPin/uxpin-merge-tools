import { ComponentPropertyCustomDescriptors } from '../../implementation/ComponentPropertyDefinition';
import { getLines } from '../../implementation/javascript/props/getLines';

export function parseNameTag(value:string):Pick<ComponentPropertyCustomDescriptors, 'customName'> | undefined {
  const customName:string = getLines(value)[0];
  if (!customName) {
    return;
  }

  return {
    customName,
  };
}
