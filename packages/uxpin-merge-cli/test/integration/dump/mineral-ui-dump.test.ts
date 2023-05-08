import { Command } from '../../../src';
import { Environment } from '../../../src/program/env/Environment';
import { emptyLatestCommitStub } from '../../resources/stubs/emptyLatestCommit';
import { runUXPinMergeCommand } from '../../utils/command/runUXPinMergeCommand';
import { setupStubbyServer } from '../../utils/stubby/setupStubbyServer';

const CURRENT_TIMEOUT = 60000;

jest.mock('../../../src/program/utils/version/getToolVersion');

describe('The dump command', () => {
  const { getTlsPort } = setupStubbyServer(emptyLatestCommitStub, CURRENT_TIMEOUT);

  describe('run for the mineral-ui repository', () => {
    it('prints the JSON describing the full repository', async () => {
      // when
      const output: string = await runUXPinMergeCommand({
        cwd: 'resources/repos/mineral-ui',
        env: {
          UXPIN_API_DOMAIN: `0.0.0.0:${getTlsPort()}`,
          UXPIN_ENV: Environment.TEST,
        },
        params: [Command.DUMP, '--webpack-config "./webpack.config.js"'],
      });

      // then
      expect(JSON.parse(output)).toMatchSnapshot({
        vcs: {
          paths: {
            configPath: expect.any(String),
            projectRoot: expect.any(String),
          },
        },
      });
    });
  });
});
