import { isValidDescriptor } from '../../../../props/descriptors/isValidDescriptor';
import {
  ComponentPropertyCustomDescriptors,
} from '../../../ComponentPropertyDefinition';
import { parseTags } from '../../../javascript/props/parseTags';
import { PropertySymbol } from './isPropertySignatureSymbol';

export function getPropertyCustomDescriptors(propertySymbol:PropertySymbol):ComponentPropertyCustomDescriptors {

  const uxpinJsDocTags:string[] = propertySymbol
    .getJsDocTags()
    .filter((jsDocTag) => isValidDescriptor(`@${jsDocTag.name}`))
    .map((jsDocTag) => `@${jsDocTag.name} ${jsDocTag.text}`);

  return parseTags(uxpinJsDocTags);
}
