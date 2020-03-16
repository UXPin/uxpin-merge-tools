import { isValidDescriptor } from '../../../../props/descriptors/isValidDescriptor';
import { parseTags } from '../../../javascript/props/parseTags';
import { ParsedPropertyDescriptor } from '../../../ParsedPropertyDescriptor';
import { ReactPropertySymbol } from './ReactPropertySymbol';

export function getPropertyCustomDescriptors(
  propertySymbol:ReactPropertySymbol,
  propertyName:string,
):ParsedPropertyDescriptor[] {

  const uxpinJsDocTags:string[] = propertySymbol
    .getJsDocTags()
    .filter((jsDocTag) => isValidDescriptor(`@${jsDocTag.name}`))
    .map((jsDocTag) => `@${jsDocTag.name} ${jsDocTag.text}`);

  return parseTags(propertyName, uxpinJsDocTags);
}
