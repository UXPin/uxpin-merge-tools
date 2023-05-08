import { resolve } from 'path';
import { DirectoryResult } from 'tmp-promise';
import { Command } from '../../../src';
import { Environment } from '../../../src/program/env/Environment';
import { emptyLatestCommitStub } from '../../resources/stubs/emptyLatestCommit';
import { runUXPinMergeCommand } from '../../utils/command/runUXPinMergeCommand';
import { setupStubbyServer } from '../../utils/stubby/setupStubbyServer';
import { setupTempProject } from '../../utils/temp/setupTempProject';

const CURRENT_TIMEOUT = 60000;

describe('Push command', () => {
  describe('from branch other than master', () => {
    const sourceDir: string = resolve(__dirname, '../../resources/designSystems/twoComponentsWithConfig');
    const { getTlsPort } = setupStubbyServer(emptyLatestCommitStub, CURRENT_TIMEOUT);
    const { getDirectory } = setupTempProject({
      sourceDir,
      gitOptions: { branch: 'test', initialise: true },
      timeout: CURRENT_TIMEOUT,
    });

    it('does not shows warning that different branches are not supported', async () => {
      // having
      const dir: DirectoryResult = getDirectory();

      // when
      // then
      const result: string = await runUXPinMergeCommand({
        cwd: dir.path,
        env: {
          UXPIN_API_DOMAIN: `0.0.0.0:${getTlsPort()}`,
          UXPIN_ENV: Environment.TEST,
        },
        params: [Command.PUSH, '--webpack-config "./webpack.config.js"', '--token DUMMY_TOKEN', '--branch test'],
      });

      expect(result).not.toEqual(expect.stringMatching(/The current commit is not on branch /));
    });
  });

  describe('from master branch', () => {
    const sourceDir: string = resolve(__dirname, '../../resources/designSystems/twoComponentsWithConfig');
    const { getTlsPort } = setupStubbyServer(emptyLatestCommitStub);
    const { getDirectory } = setupTempProject({
      sourceDir,
      gitOptions: { initialise: true },
      timeout: CURRENT_TIMEOUT,
    });

    it('does not show warning that different branches are not supported', async () => {
      // having
      const dir: DirectoryResult = getDirectory();

      // when
      // then
      const result: string = await runUXPinMergeCommand({
        cwd: dir.path,
        env: {
          UXPIN_API_DOMAIN: `0.0.0.0:${getTlsPort()}`,
          UXPIN_ENV: Environment.TEST,
        },
        params: [Command.PUSH, '--webpack-config "./webpack.config.js"', '--token DUMMY_TOKEN'],
      });

      expect(result).not.toEqual(expect.stringMatching(/The current commit is not on branch /));
    });
  });

  describe('from main branch', () => {
    const sourceDir: string = resolve(__dirname, '../../resources/designSystems/twoComponentsWithConfig');
    const { getTlsPort } = setupStubbyServer(emptyLatestCommitStub);
    const { getDirectory } = setupTempProject({
      sourceDir,
      gitOptions: { branch: 'main', initialise: true },
      timeout: CURRENT_TIMEOUT,
    });

    it('does not show warning that different branches are not supported', async () => {
      // having
      const dir: DirectoryResult = getDirectory();

      // when
      // then
      const result: string = await runUXPinMergeCommand({
        cwd: dir.path,
        env: {
          UXPIN_API_DOMAIN: `0.0.0.0:${getTlsPort()}`,
          UXPIN_ENV: Environment.TEST,
        },
        params: [Command.PUSH, '--webpack-config "./webpack.config.js"', '--token DUMMY_TOKEN'],
      });

      expect(result).not.toEqual(expect.stringMatching(/The current commit is not on branch /));
    });
  });
});
