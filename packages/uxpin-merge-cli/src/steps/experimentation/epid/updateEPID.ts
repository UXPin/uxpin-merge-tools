import { EPID } from './EPID';
import { getProjectEPID } from './getProjectEPID';
import { saveEPID } from './saveEPID';

export async function updateEPID(filePath:string, data:Partial<EPID>):Promise<void> {
  const epid:EPID = await getProjectEPID(filePath);

  return saveEPID(filePath, Object.assign(epid, data));
}
