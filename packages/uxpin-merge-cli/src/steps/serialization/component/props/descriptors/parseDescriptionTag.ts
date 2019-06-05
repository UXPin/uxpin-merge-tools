import { ComponentPropertyCustomDescriptors } from '../../implementation/ComponentPropertyDefinition';

export function parseDescriptionTag(
  value:string,
):Pick<ComponentPropertyCustomDescriptors, 'customDescription'> | undefined {
  if (!value) {
    return;
  }

  return {
    customDescription: value,
  };
}
