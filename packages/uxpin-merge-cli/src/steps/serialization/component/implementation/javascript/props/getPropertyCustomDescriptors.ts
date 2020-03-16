import { getJSDocTagsArrayFromString } from '../../../comments/getJSDocTagsArrayFromString';
import { ParsedPropertyDescriptor } from '../../ParsedPropertyDescriptor';
import { parseTags } from './parseTags';

export function getPropertyCustomDescriptors(propName:string, desc:string):ParsedPropertyDescriptor[] {
  const tags:string[] = getJSDocTagsArrayFromString(desc);

  return parseTags(propName, tags);
}
