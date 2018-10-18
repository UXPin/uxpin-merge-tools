import { existsSync, readFileSync, unlinkSync } from 'fs';
import { resolve } from 'path';
import { TEMP_DIR_PATH } from '../../../../src/steps/building/config/getConfig';
import { EPID } from '../../../../src/steps/experimentation/epid/EPID';
import { getEPIDFilePath } from '../../../../src/steps/experimentation/epid/getEPIDFilePath';
import { getProjectEPID } from '../../../../src/steps/experimentation/epid/getProjectEPID';
import { setTimeoutBeforeAll } from '../../../utils/command/setTimeoutBeforeAll';
import { setupExperimentationServerTest } from '../../../utils/experimentation/setupExperimentationServerTest';

const CURRENT_TIMEOUT:number = 30000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('createEPID', () => {
  describe('when epid file doesn\'t exist', () => {
    const projectPath:string = resolve(__dirname, '../../../');
    const epidFilePath:string = getEPIDFilePath(projectPath);

    setupExperimentationServerTest({ projectPath });

    afterAll(() => {
      unlinkSync(resolve(projectPath, TEMP_DIR_PATH));
    });

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

  describe('when epid file exists', () => {
    const projectPath:string = resolve(__dirname, '../../../resources/designSystems/withEpidFile');
    const epidFilePath:string = getEPIDFilePath(projectPath);
    let epidContent:string;

    beforeAll(() => {
      epidContent = getEpidContent();
    });

    setupExperimentationServerTest({ projectPath });

    it('should not override already existed epid file', () => {
      expect(epidContent).toEqual(getEpidContent());
    });

    function getEpidContent():string {
      return readFileSync(epidFilePath).toString('utf-8');
    }
  });
});
