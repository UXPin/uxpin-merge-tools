import { basename } from 'path';

const PRESET_FILENAME_REGEX:RegExp = /^\d+-.+(\.json)$/i;

export function filterPresets(paths:string[]):string[] {
  return paths.filter(isPreset);
}

function isPreset(path:string):boolean {
  const fileName:string = basename(path);
  return PRESET_FILENAME_REGEX.test(fileName);
}
