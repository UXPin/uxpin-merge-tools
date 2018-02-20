import { basename } from 'path';

const PRESET_FILENAME_REGEX:RegExp = /^(\d+)-(.+)\.json$/i;
const PRESET_NAME_INDEX_IN_MATCH_RESULT:number = 2;

export function getPresetName(path:string):string {
  const fileName:string = basename(path);
  const found:RegExpMatchArray | null = fileName.match(PRESET_FILENAME_REGEX);
  if (found && found[PRESET_NAME_INDEX_IN_MATCH_RESULT]) {
    return found[PRESET_NAME_INDEX_IN_MATCH_RESULT];
  }

  return '';
}

export function isPreset(path:string):boolean {
  const fileName:string = basename(path);
  return PRESET_FILENAME_REGEX.test(fileName);
}

export function getSortIndex(path:string):number {
  const fileName:string = basename(path);
  const found:RegExpMatchArray | null = fileName.match(PRESET_FILENAME_REGEX);
  if (found && found[1]) {
    return parseInt(found[1], 10);
  }

  return Infinity;
}
