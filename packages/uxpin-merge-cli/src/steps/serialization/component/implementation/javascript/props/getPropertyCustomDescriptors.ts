import { ComponentPropertyCustomDescriptors } from '../../ComponentPropertyDefinition';
import { getJSDocTagsArrayFromString } from '../../../comments/getJSDocTagsArrayFromString';
import { parseTags } from './parseTags';

export function getPropertyCustomDescriptors(desc:string):ComponentPropertyCustomDescriptors {
  const tags:string[] = getJSDocTagsArrayFromString(desc);

  return parseTags(tags);
}
