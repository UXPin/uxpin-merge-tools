import { Command } from '../../../src';
import { Environment } from '../../../src/program/env/Environment';
import { TEMP_DIR_NAME } from '../../../src/steps/building/config/getConfig';
import { emptyLatestCommitStub } from '../../resources/stubs/emptyLatestCommit';
import { runCommand } from '../../utils/command/runCommand';
import { runUXPinMergeCommand } from '../../utils/command/runUXPinMergeCommand';
import { setupStubbyServer } from '../../utils/stubby/setupStubbyServer';

const CURRENT_TIMEOUT = 60000;

describe('Building designSystems/cantWriteToUxpinTemp design system', () => {
  const DEFAULT_PERMISSIONS = '755';
  const READONLY_PERMISSIONS = '444';
  const workingDir = 'resources/designSystems/cantWriteToUxpinTemp';
  const uxpinTempPath = `test/${workingDir}/${TEMP_DIR_NAME}`;
  const { getTlsPort } = setupStubbyServer(emptyLatestCommitStub, CURRENT_TIMEOUT);
  const chmod: (path: string, mode: string) => Promise<string> = (path, mode) => runCommand(`chmod ${mode} ${path}`);

  afterEach(() => {
    return chmod(uxpinTempPath, DEFAULT_PERMISSIONS);
  });

  it('shows permission denied Error when can not write to temporary directory', async () => {
    // when
    await chmod(uxpinTempPath, READONLY_PERMISSIONS);

    // then
    try {
      await runUXPinMergeCommand({
        cwd: workingDir,
        env: {
          UXPIN_API_DOMAIN: `0.0.0.0:${getTlsPort()}`,
          UXPIN_ENV: Environment.TEST,
        },
        params: [Command.PUSH],
      });
    } catch (error) {
      expect((error as Error).message).toMatch('EACCES: permission denied');
    }
  });
});
