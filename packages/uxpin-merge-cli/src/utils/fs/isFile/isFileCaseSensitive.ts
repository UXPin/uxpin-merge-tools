import { readdir } from 'fs-extra';
import { parse } from 'path';

export async function isFileCaseSensitive(path:string):Promise<boolean> {
  const { dir, base } = parse(path);
  const dirContents:string[] = await readdir(dir);
  return dirContents.includes(base);
}
