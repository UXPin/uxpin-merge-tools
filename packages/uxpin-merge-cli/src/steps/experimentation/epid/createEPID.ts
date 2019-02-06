import { EPID } from './EPID';
import { saveEPID } from './saveEPID';
import { createHash } from 'crypto';
import { v4 } from 'uuid';

export function createEPID(filePath:string, epid:Partial<EPID>):Promise<void> {
  return saveEPID(filePath, Object.assign({}, epid, { revisionId: generateRevisionId() }));
}

function generateRevisionId():string {
  const designSystemId:string = v4();
  const commitHash:string = generateRandomCommitHash();

  return `${designSystemId}_${commitHash}`;
}

function generateRandomCommitHash():string {
  return createHash('sha1').update(String(+new Date())).digest('hex');
}
