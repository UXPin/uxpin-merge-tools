import { resolve } from 'path';
import { DirectoryResult } from 'tmp-promise';
import { Command } from '../../../src';
import { Environment } from '../../../src/program/env/Environment';
import { nonExistingLatestCommitStub } from '../../resources/stubs/nonExistingLatestCommit';
import { runUXPinMergeCommand } from '../../utils/command/runUXPinMergeCommand';
import { setupStubbyServer } from '../../utils/stubby/setupStubbyServer';
import { setupTempProject } from '../../utils/temp/setupTempProject';

const CURRENT_TIMEOUT = 60000;

describe('Push command with latest commit which doesnt exist in tree with force option', () => {
  const sourceDir: string = resolve(__dirname, '../../resources/designSystems/twoComponentsWithConfig');
  const { getTlsPort } = setupStubbyServer(nonExistingLatestCommitStub, CURRENT_TIMEOUT);
  const { getDirectory } = setupTempProject({ sourceDir, gitOptions: { initialise: true }, timeout: CURRENT_TIMEOUT });

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
        params: [Command.PUSH, '--webpack-config "./webpack.config.js"', '--token DUMMY_TOKEN', '--force'],
      });
    } catch (error) {
      expect((error as any).stderr).not.toMatch('Unable to find revision');
    }
  });
});
