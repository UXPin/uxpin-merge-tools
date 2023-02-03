import { resolve } from 'path';
import { DirectoryResult } from 'tmp-promise';
import { Command } from '../../../src';
import { Environment } from '../../../src/program/env/Environment';
import { nonExistingLatestCommitStub } from '../../resources/stubs/nonExistingLatestCommit';
import { runUXPinMergeCommand } from '../../utils/command/runUXPinMergeCommand';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';
import { setupStubbyServer } from '../../utils/stubby/setupStubbyServer';
import { setupTempProject } from '../../utils/temp/setupTempProject';

const CURRENT_TIMEOUT = 60000;

setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('Push command with latest commit which doesnt exist in tree', () => {
  const sourceDir: string = resolve(__dirname, '../../resources/designSystems/twoComponentsWithConfig');
  const { getTlsPort } = setupStubbyServer(nonExistingLatestCommitStub);
  const { getDirectory } = setupTempProject({ sourceDir, gitOptions: { initialise: true } });

  it('shows error when latest commit retrieved from API doesnt exist in local tree', async () => {
    // having
    const dir: DirectoryResult = getDirectory();

    // when
    // then
    try {
      await runUXPinMergeCommand({
        cwd: dir.path,
        env: {
          UXPIN_API_DOMAIN: `0.0.0.0:${getTlsPort()}`,
          UXPIN_ENV: Environment.TEST,
        },
        params: [Command.PUSH, '--webpack-config "./webpack.config.js"', '--token DUMMY_TOKEN'],
      });
    } catch (error) {
      expect((error as any).stderr).toMatch('Unable to find revision');
    }
  });
});
