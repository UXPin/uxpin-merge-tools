import { getJSDocTagsArrayFromString } from '../../../comments/getJSDocTagsArrayFromString';
import { ComponentPropertyCustomDescriptors } from '../../ComponentPropertyDefinition';
import { parseTags } from './parseTags';

export function getPropertyCustomDescriptors(desc:string):ComponentPropertyCustomDescriptors {
  const tags:string[] = getJSDocTagsArrayFromString(desc);

  return parseTags(tags);
}
