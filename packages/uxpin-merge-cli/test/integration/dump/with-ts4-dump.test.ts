import { Command } from '../../../src';
import { Environment } from '../../../src/program/env/Environment';
import { emptyLatestCommitStub } from '../../resources/stubs/emptyLatestCommit';
import { runUXPinMergeCommand } from '../../utils/command/runUXPinMergeCommand';
import { setupStubbyServer } from '../../utils/stubby/setupStubbyServer';

const CURRENT_TIMEOUT = 30000;

jest.mock('../../../src/program/utils/version/getToolVersion');

describe('The dump command', () => {
  const { getTlsPort } = setupStubbyServer(emptyLatestCommitStub, CURRENT_TIMEOUT);

  describe('run for the with-ts4 repository', () => {
    it('prints components with proper properties', () => {
      // when
      return runUXPinMergeCommand({
        cwd: 'resources/designSystems/withTS4',
        env: {
          UXPIN_API_DOMAIN: `0.0.0.0:${getTlsPort()}`,
          UXPIN_ENV: Environment.TEST,
        },
        params: [Command.DUMP, '--config="./uxpin.config.js"'],
      }).then((consoleOutput) => {
        // then
        const output: any = JSON.parse(consoleOutput);
        expect(output.categorizedComponents).toMatchSnapshot();
      });
    });
  });
});
