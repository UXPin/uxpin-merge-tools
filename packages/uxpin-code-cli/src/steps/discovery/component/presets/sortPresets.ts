import { basename } from 'path';

const GET_INDEX_REGEX:RegExp = /^(\d+)-/;

export function sortPresets(paths:string[]):string[] {
  return paths.sort(comparator);
}

function comparator(path1:string, path2:string):number {
  const index1:number = getIndex(basename(path1));
  const index2:number = getIndex(basename(path2));

  if (index1 > index2) {
    return 1;
  }
  if (index1 < index2) {
    return -1;
  }

  return 0;
}

function getIndex(fileName:string):number {
  const found:RegExpMatchArray | null = fileName.match(GET_INDEX_REGEX);
  if (found && found[1]) {
    return parseInt(found[1], 10);
  }

  return 0;
}
