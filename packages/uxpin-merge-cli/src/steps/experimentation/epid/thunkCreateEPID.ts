import { createHash } from 'crypto';
import { v4 } from 'uuid';
import { DSMetadata } from '../../../program/DSMeta';
import { isFile } from '../../../utils/fs/isFile';
import { writeToFile } from '../../../utils/fs/writeToFile';
import { BuildOptions } from '../../building/BuildOptions';
import { EPID } from './EPID';
import { getEPIDFilePath } from './getEPIDFilePath';

export function thunkCreateEPID(buildOptions:BuildOptions):(ds:DSMetadata) => Promise<any> {
  return async () => {
    const epidFilePath:string = getEPIDFilePath(buildOptions.projectRoot);
    if (await isFile(epidFilePath)) {
      return;
    }

    await createEPID(epidFilePath);
  };
}

function createEPID(filePath:string):Promise<void> {
  return writeToFile(filePath, JSON.stringify(generateEPID()));
}

function generateEPID():EPID {
  const designSystemId:string = v4();
  const commitHash:string = generateRandomCommitHash();

  return {
    revisionId: `${designSystemId}_${commitHash}`,
  };
}

function generateRandomCommitHash():string {
  return createHash('sha1').update(String(+new Date())).digest('hex');
}
