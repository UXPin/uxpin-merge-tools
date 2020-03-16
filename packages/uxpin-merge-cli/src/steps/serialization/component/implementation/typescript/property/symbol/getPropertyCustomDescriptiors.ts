import { isValidDescriptor } from '../../../../props/descriptors/isValidDescriptor';
import { ParsedPropertyDescriptors } from '../../../ComponentPropertyDefinition';
import { parseTags } from '../../../javascript/props/parseTags';
import { ReactPropertySymbol } from './ReactPropertySymbol';

export function getPropertyCustomDescriptors(
  propertySymbol:ReactPropertySymbol,
):ParsedPropertyDescriptors {

  const uxpinJsDocTags:string[] = propertySymbol
    .getJsDocTags()
    .filter((jsDocTag) => isValidDescriptor(`@${jsDocTag.name}`))
    .map((jsDocTag) => `@${jsDocTag.name} ${jsDocTag.text}`);

  return { descriptors: parseTags(uxpinJsDocTags) };
}
