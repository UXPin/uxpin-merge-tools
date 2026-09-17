import { parse } from 'path';
import { pathExists, readdir } from '../../../common/fs/projectFs';

export async function isFileCaseSensitive(path: string): Promise<boolean> {
  const { dir, base } = parse(path);
  // Read through the project's filesystem, so a project held in memory answers
  // about its own files - this is how a component's documentation file is
  // found - and asked about a directory that is not there at all (a component
  // with nothing beside it), the answer is "not this file" rather than a
  // thrown ENOENT.
  if (!(await pathExists(dir))) {
    return false;
  }
  const dirContents: string[] = await readdir(dir);
  return dirContents.includes(base);
}
