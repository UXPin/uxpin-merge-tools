import { createHash, Hash } from 'crypto';
import { readFile } from 'fs-extra';

export async function getFileChecksum(filePath:string):Promise<string> {
  const md5sum:Hash = createHash('md5');
  md5sum.update(await readFile(filePath));
  return md5sum.digest('hex');
}
