import { TEMP_DIR_NAME } from '../../../../../src/steps/building/config/getConfig';
import { runCommand } from '../../../../utils/command/runCommand';
import { runUXPinMergeCommand } from '../../../../utils/command/runUXPinMergeCommand';
import { setTimeoutBeforeAll } from '../../../../utils/command/setTimeoutBeforeAll';

const CURRENT_TIMEOUT:number = 60000;

setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('Building designSystems/cantWriteToUxpinTemp design system', () => {
  const DEFAULT_PERMISSIONS:string = '755';
  const READONLY_PERMISSIONS:string = '444';
  const workingDir:string = 'resources/designSystems/cantWriteToUxpinTemp';
  const uxpinTempPath:string = `test/${workingDir}/${TEMP_DIR_NAME}`;

  const chmod:(path:string, mode:string) => Promise<string> = (path, mode) => runCommand(`chmod ${mode} ${path}`);

  afterEach(() => {
    return chmod(uxpinTempPath, DEFAULT_PERMISSIONS);
  });

  it('shows permission denied Error when can not write to temporary directory', () => {
    return chmod(uxpinTempPath, READONLY_PERMISSIONS)
      .then(() => runUXPinMergeCommand({ cwd: workingDir, params: ['push'] }))
      .catch((output) => {
        expect(output).toContain('ERROR:');
        expect(output).toContain('EACCES: permission denied');
      });
  });
});
