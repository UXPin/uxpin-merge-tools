import { createHash } from 'crypto';
import { v4 } from 'uuid';
import { StepExecutor } from '../../../program/command/Step';
import { ExperimentationState } from '../../../program/command/experimentation/getExperimentationCommandSteps';
import { DSMetadata } from '../../../program/DSMeta';
import { Store } from '../../../program/utils/store/Store';
import { isFile } from '../../../utils/fs/isFile';
import { writeToFile } from '../../../utils/fs/writeToFile';
import { BuildOptions } from '../../building/BuildOptions';
import { EPID } from './EPID';
import { getEPIDFilePath } from './getEPIDFilePath';
import { getNgrokSessionId } from '../../../common/services/ngrok/getNgrokSessionId';
import { getProjectEPID } from './getProjectEPID';

export function thunkCreateEPID(buildOptions:BuildOptions, store:Store<ExperimentationState>):StepExecutor {
  return async (ds:DSMetadata) => {
    const { projectRoot } = buildOptions;
    const epidFilePath:string = getEPIDFilePath(projectRoot);
    const epidExists:boolean = await isFile(epidFilePath);

    if (epidExists) {
      await updateEPID(projectRoot, {
        ngrokSessionId: getNgrokSessionId(store.state.ngrokUrl!),
      });
    } else {
      await createEPID(epidFilePath, {
        ngrokSessionId: getNgrokSessionId(store.state.ngrokUrl!),
      });
    }


    return ds;
  };
}

function createEPID(filePath:string, epid:Partial<EPID>):Promise<void> {
  return saveEPID(filePath, generateEPID(epid));
}

function saveEPID(filePath:string, epid:EPID):Promise<void> {
  return writeToFile(filePath, JSON.stringify(epid));
}

async function updateEPID(projectRoot:string, data:Partial<EPID>):Promise<void> {
  const epid:EPID = await getProjectEPID(projectRoot);

  return saveEPID(getEPIDFilePath(projectRoot), Object.assign(epid, data));
}

function generateEPID(epid:Partial<EPID>):EPID {
  const designSystemId:string = v4();
  const commitHash:string = generateRandomCommitHash();

  return Object.assign({} as EPID, epid, {
    revisionId: `${designSystemId}_${commitHash}`,
  });
}

function generateRandomCommitHash():string {
  return createHash('sha1').update(String(+new Date())).digest('hex');
}
