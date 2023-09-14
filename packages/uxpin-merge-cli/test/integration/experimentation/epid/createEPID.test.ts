import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { EPID } from '../../../../src/steps/experimentation/epid/EPID';
import { getEPIDFilePath } from '../../../../src/steps/experimentation/epid/getEPIDFilePath';
import { getProjectEPID } from '../../../../src/steps/experimentation/epid/getProjectEPID';
import { getRandomPortNumber } from '../../../utils/e2e/server/getRandomPortNumber';
import { setupExperimentationServerTest } from '../../../utils/experimentation/setupExperimentationServerTest';

const CURRENT_TIMEOUT = 30000;

describe('createEPID', () => {
  describe("when epid file doesn't exist", () => {
    let epidFilePath: string;

    const { getWorkingDir } = setupExperimentationServerTest({
      timeout: CURRENT_TIMEOUT,
    });

    beforeEach(() => {
      epidFilePath = getEPIDFilePath(getWorkingDir());
    });

    it('should create epid file', () => {
      expect(existsSync(epidFilePath)).toBeTruthy();
    });

    it('should epid file has specific format', async () => {
      // given
      const expectedEPID: EPID = {
        revisionId: expect.stringMatching(/^[0-9a-f-]{36}_[0-9a-f]{40}/),
      };

      // when
      // then
      expect(await getProjectEPID(getEPIDFilePath(getWorkingDir()))).toEqual(expectedEPID);
    });
  });

  describe('when epid file exists', () => {
    const projectPath: string = resolve(__dirname, '../../../resources/designSystems/withEpidFile');
    const { getWorkingDir } = setupExperimentationServerTest({
      port: getRandomPortNumber(),
      projectPath,
      timeout: CURRENT_TIMEOUT,
    });

    it('should not override already existed epid file', () => {
      expect(getEpidContent(getWorkingDir())).toEqual(getEpidContent(projectPath));
    });

    function getEpidContent(projectDir: string): string {
      return readFileSync(getEPIDFilePath(projectDir)).toString('utf-8');
    }
  });
});
