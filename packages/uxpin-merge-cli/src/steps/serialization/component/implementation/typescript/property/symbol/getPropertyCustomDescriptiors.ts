import { isValidDescriptor } from '../../../../props/parsing/descriptors/isValidDescriptor';
import { ParsedPropertyDescriptors } from '../../../ComponentPropertyDefinition';
import { parseTags } from '../../../javascript/props/parseTags';
import { getJSDocTagInfoText } from '../../comments/jsdoc-helpers';
import { ReactPropertySymbol } from './ReactPropertySymbol';

export function getPropertyCustomDescriptors(propertySymbol: ReactPropertySymbol): ParsedPropertyDescriptors {
  const uxpinJsDocTags: string[] = propertySymbol
    .getJsDocTags()
    .filter((jsDocTag) => isValidDescriptor(`@${jsDocTag.name}`))
    .map((jsDocTag) => `@${jsDocTag.name} ${getJSDocTagInfoText(jsDocTag)}`);

  return { descriptors: parseTags(uxpinJsDocTags) };
}
