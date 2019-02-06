import { writeToFile } from '../../../utils/fs/writeToFile';
import { EPID } from './EPID';

export function saveEPID(filePath:string, epid:EPID):Promise<void> {
  return writeToFile(filePath, JSON.stringify(epid));
}
