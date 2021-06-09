import { getJSDocTagsArrayFromString } from '../../../../../steps/serialization/component/comments/getJSDocTagsArrayFromString';
import { ParsedPropertyDescriptors } from '../../../../../steps/serialization/component/implementation/ComponentPropertyDefinition';
import { parseTags } from './parseTags';

export function getPropertyCustomDescriptors(desc:string):ParsedPropertyDescriptors {
  const tags:string[] = getJSDocTagsArrayFromString(desc);

  return { descriptors: parseTags(tags) };
}
