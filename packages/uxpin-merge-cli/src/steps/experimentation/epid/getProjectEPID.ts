import { readFile } from 'fs-extra';
import { EPID } from './EPID';

export async function getProjectEPID(filePath:string):Promise<EPID> {
  const content:string = await readFile(filePath, { encoding: 'utf-8' });
  return JSON.parse(content);
}
