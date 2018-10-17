import { readFile } from 'fs-extra';
import { EPID } from './EPID';
import { getEPIDFilePath } from './getEPIDFilePath';

export async function getProjectEPID(projectRoot:string):Promise<EPID> {
  const content:string = await readFile(getEPIDFilePath(projectRoot), { encoding: 'utf-8' });
  return JSON.parse(content);
}
