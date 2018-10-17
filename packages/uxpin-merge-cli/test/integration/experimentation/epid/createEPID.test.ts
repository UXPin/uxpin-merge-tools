import { existsSync } from 'fs';
import { resolve } from 'path';
import { EPID } from '../../../../src/steps/experimentation/epid/EPID';
import { getEPIDFilePath } from '../../../../src/steps/experimentation/epid/getEPIDFilePath';
import { getProjectEPID } from '../../../../src/steps/experimentation/epid/getProjectEPID';
import { setTimeoutBeforeAll } from '../../../utils/command/setTimeoutBeforeAll';
import { setupExperimentationServerTest } from '../../../utils/experimentation/setupExperimentationServerTest';

const CURRENT_TIMEOUT:number = 30000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('createEPID', () => {
  const projectPath:string = resolve(__dirname, '../../../');
  const epidFilePath:string = getEPIDFilePath(projectPath);

  setupExperimentationServerTest({ projectPath });

  it('should create epid file', () => {
    expect(existsSync(epidFilePath)).toBeTruthy();
  });

  it('should epid file has specific format', async () => {
    // given
    const expectedEPID:EPID = {
      revisionId: expect.stringMatching(/^[0-9a-f-]{36}_[0-9a-f]{40}/),
    };

    // when
    // then
    expect(await getProjectEPID(projectPath)).toEqual(expectedEPID);
  });
});
