import { getSortIndex } from './presetFileNameParser';

export function sortPresets(paths: string[]): string[] {
  return paths.sort(comparator);
}

function comparator(path1: string, path2: string): number {
  const index1: number = getSortIndex(path1);
  const index2: number = getSortIndex(path2);
  return index1 - index2;
}
