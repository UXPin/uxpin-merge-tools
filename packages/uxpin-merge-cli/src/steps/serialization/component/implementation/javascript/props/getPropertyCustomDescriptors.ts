import { getJSDocTagsArrayFromString } from '../../../comments/getJSDocTagsArrayFromString';
import { ParsedPropertyDescriptors } from '../../ComponentPropertyDefinition';
import { parseTags } from './parseTags';

export function getPropertyCustomDescriptors(desc:string):ParsedPropertyDescriptors {
  const tags:string[] = getJSDocTagsArrayFromString(desc);

  return { descriptors: parseTags(tags) };
}
