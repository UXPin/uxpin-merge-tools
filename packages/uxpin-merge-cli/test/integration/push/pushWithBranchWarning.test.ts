import { resolve } from 'path';
import { DirectoryResult } from 'tmp-promise';
import { Command } from '../../../src';
import { Environment } from '../../../src/program/env/Environment';
import { emptyLatestCommitStub } from '../../resources/stubs/emptyLatestCommit';
import { runUXPinMergeCommand } from '../../utils/command/runUXPinMergeCommand';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';
import { setupStubbyServer } from '../../utils/stubby/setupStubbyServer';
import { setupTempProject } from '../../utils/temp/setupTempProject';

const CURRENT_TIMEOUT:number = 60000;

setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('Push command', () => {
  describe('from branch other than master', () => {
    const sourceDir:string = resolve(__dirname, '../../resources/designSystems/twoComponentsWithConfig');
    const projectPath:string = resolve(__dirname, '../../../');
    const { getTlsPort } = setupStubbyServer(emptyLatestCommitStub);
    const { getDirectory } = setupTempProject({
      gitOptions: { branch: 'test', initialise: true },
      linkPackage: true,
      projectPath,
      sourceDir,
    });

    it('shows warning that different branches are not supported', async () => {
      // having
      const dir:DirectoryResult = getDirectory();

      // when
      // then
      const result:string = await runUXPinMergeCommand({
        cwd: dir.path,
        env: {
          UXPIN_API_DOMAIN: `0.0.0.0:${getTlsPort()}`,
          UXPIN_ENV: Environment.TEST,
        },
        params: [
          Command.PUSH,
          '--webpack-config "./webpack.config.js"',
          '--token DUMMY_TOKEN',
        ],
      });

      expect(result).toEqual(expect.stringMatching(/branch different than master are currently not supported/));
    });
  });

  describe('from master branch', () => {
    const sourceDir:string = resolve(__dirname, '../../resources/designSystems/twoComponentsWithConfig');
    const projectPath:string = resolve(__dirname, '../../../');
    const { getTlsPort } = setupStubbyServer(emptyLatestCommitStub);
    const { getDirectory } = setupTempProject({
      gitOptions: { initialise: true },
      linkPackage: true,
      projectPath,
      sourceDir,
    });

    it('does not show warning that different branches are not supported', async () => {
      // having
      const dir:DirectoryResult = getDirectory();

      // when
      // then
      const result:string = await runUXPinMergeCommand({
        cwd: dir.path,
        env: {
          UXPIN_API_DOMAIN: `0.0.0.0:${getTlsPort()}`,
          UXPIN_ENV: Environment.TEST,
        },
        params: [
          Command.PUSH,
          '--webpack-config "./webpack.config.js"',
          '--token DUMMY_TOKEN',
        ],
      });

      expect(result).not.toEqual(expect.stringMatching(/branch different than master are currently not supported/));
    });
  });
});
