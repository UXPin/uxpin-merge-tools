import { EPID } from './EPID';
import { getEPIDFilePath } from './getEPIDFilePath';
import { getProjectEPID } from './getProjectEPID';
import { saveEPID } from './saveEPID';

export async function updateEPID(projectRoot:string, data:Partial<EPID>):Promise<void> {
  const epid:EPID = await getProjectEPID(projectRoot);

  return saveEPID(getEPIDFilePath(projectRoot), Object.assign(epid, data));
}
