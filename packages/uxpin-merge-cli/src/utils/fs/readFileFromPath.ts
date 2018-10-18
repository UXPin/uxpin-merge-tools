import { readFile } from 'fs-extra';

export function readFileFromPath(filePath:string):Promise<Buffer> {
  return readFile(filePath);
}
