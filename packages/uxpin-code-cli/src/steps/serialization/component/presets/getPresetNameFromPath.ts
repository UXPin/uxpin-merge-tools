import { basename } from 'path';

const GET_NAME_REGEX:RegExp = /^\d+-(.+)\.json$/i;

export function getPresetNameFromPath(path:string):string {
  const fileName:string = basename(path);
  const found:RegExpMatchArray | null = fileName.match(GET_NAME_REGEX);

  if (found && found[1]) {
    return found[1];
  }

  return '';
}
