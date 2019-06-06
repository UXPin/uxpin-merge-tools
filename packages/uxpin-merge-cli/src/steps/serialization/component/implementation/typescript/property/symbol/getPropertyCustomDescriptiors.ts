import { isValidDescriptor } from '../../../../props/descriptors/isValidDescriptor';
import {
  ComponentPropertyCustomDescriptors,
} from '../../../ComponentPropertyDefinition';
import { parseTags } from '../../../javascript/props/parseTags';
import { ReactPropertySymbol } from './ReactPropertySymbol';

export function getPropertyCustomDescriptors(propertySymbol:ReactPropertySymbol):ComponentPropertyCustomDescriptors {

  const uxpinJsDocTags:string[] = propertySymbol
    .getJsDocTags()
    .filter((jsDocTag) => isValidDescriptor(`@${jsDocTag.name}`))
    .map((jsDocTag) => `@${jsDocTag.name} ${jsDocTag.text}`);

  return parseTags(uxpinJsDocTags);
}
