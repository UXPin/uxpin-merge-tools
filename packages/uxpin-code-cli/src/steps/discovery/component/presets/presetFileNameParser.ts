import { basename } from 'path';

const PRESET_FILENAME_REGEX:RegExp = /^(\d+)-(.+)\.json$/i;
const MAGIC_NUMBER:number = 2;

export function getPresetName(path:string):string {
  const fileName:string = basename(path);
  const found:RegExpMatchArray | null = fileName.match(PRESET_FILENAME_REGEX);
  if (found && found[MAGIC_NUMBER]) {
    return found[MAGIC_NUMBER];
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
