import { parse, ParsedPath } from 'path';

export function sortFilePaths(paths: string[]): string[] {
  return paths.sort(sorter);
}

function sorter(fullPathA: string, fullPathB: string): number {
  const parsedPathA: ParsedPath = parse(fullPathA);
  const parsedPathB: ParsedPath = parse(fullPathB);

  if (parsedPathA.dir === parsedPathB.dir) {
    return sortAZ(`${parsedPathA.name}${parsedPathA.ext}`, `${parsedPathB.name}${parsedPathB.ext}`);
  }

  if (parsedPathA.dir.includes(parsedPathB.dir)) {
    return 1;
  }

  if (parsedPathB.dir.includes(parsedPathA.dir)) {
    return -1;
  }

  return sortAZ(parsedPathA.dir, parsedPathB.dir);
}

function sortAZ(a: string, b: string): number {
  return a > b ? 1 : a < b ? -1 : 0;
}
