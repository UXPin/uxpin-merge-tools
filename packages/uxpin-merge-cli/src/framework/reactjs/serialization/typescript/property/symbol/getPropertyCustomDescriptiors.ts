import { ParsedPropertyDescriptors } from '../../../../../../steps/serialization/component/implementation/ComponentPropertyDefinition';
import { parseTags } from '../../../../../../steps/serialization/component/implementation/javascript/props/parseTags';
import { isValidDescriptor } from '../../../../../../steps/serialization/component/props/parsing/descriptors/isValidDescriptor';
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
