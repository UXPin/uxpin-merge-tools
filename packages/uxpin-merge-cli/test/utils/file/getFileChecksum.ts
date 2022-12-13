import { createHash, Hash } from 'crypto';
import { readFile } from 'fs-extra';

export async function getFileChecksum(filePath: string): Promise<string> {
  return getBufferChecksum(await readFile(filePath));
}

export function getBufferChecksum(buffer: Buffer): string {
  const md5sum: Hash = createHash('md5');
  md5sum.update(buffer);
  return md5sum.digest('hex');
}
