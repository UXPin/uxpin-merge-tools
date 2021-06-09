import { ParsedPropertyDescriptors } from '../../../../../../steps/serialization/component/implementation/ComponentPropertyDefinition';
import { isValidDescriptor } from '../../../../../../steps/serialization/component/props/parsing/descriptors/isValidDescriptor';
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
