import { isPreset } from './presetFileNameParser';

export function filterPresets(paths:string[]):string[] {
  return paths.filter((path) => isPreset(path));
}
