import { Command } from '../../../src';
import { Environment } from '../../../src/program/env/Environment';
import { emptyLatestCommitStub } from '../../resources/stubs/emptyLatestCommit';
import { runUXPinMergeCommand } from '../../utils/command/runUXPinMergeCommand';
import { setupStubbyServer } from '../../utils/stubby/setupStubbyServer';

const CURRENT_TIMEOUT = 60000;

jest.mock('../../../src/program/utils/version/getToolVersion');

describe('The dump command', () => {
  const { getTlsPort } = setupStubbyServer(emptyLatestCommitStub, CURRENT_TIMEOUT);

  describe('run for the namespacedComponents repository', () => {
    it('prints the JSON describing the full repository', async () => {
      // when
      const output: string = await runUXPinMergeCommand({
        cwd: 'resources/designSystems/namespacedComponents',
        env: {
          UXPIN_API_DOMAIN: `0.0.0.0:${getTlsPort()}`,
          UXPIN_ENV: Environment.TEST,
        },
        params: [Command.DUMP, '--webpack-config "./webpack.config.js"'],
      });

      // then
      expect(JSON.parse(output)).toMatchSnapshot({
        vcs: expect.objectContaining({
          branchName: expect.any(String),
          commitHash: expect.stringMatching(/[a-z0-9]+/),
        }),
      });
    });
  });

  describe('run for the namespacedComponents repository with invalid components', () => {
    it('prints an error when namespace is duplicated for two components with the same name', async () => {
      expect.assertions(1);

      try {
        // when
        await runUXPinMergeCommand({
          cwd: 'resources/designSystems/namespacedComponents',
          env: {
            UXPIN_API_DOMAIN: `0.0.0.0:${getTlsPort()}`,
            UXPIN_ENV: Environment.TEST,
          },
          params: [Command.DUMP, '--webpack-config "./webpack.config.js"', '--config "./uxpin.invalid.config.js"'],
        });
      } catch (error) {
        // then
        expect((error as any).stderr).toMatch(/Component \"Card\.Header\.Button\" already exists/);
      }
    });

    it('prints an error when component uses not existing namespace', async () => {
      expect.assertions(1);

      try {
        // when
        await runUXPinMergeCommand({
          cwd: 'resources/designSystems/namespacedComponents',
          env: {
            UXPIN_API_DOMAIN: `0.0.0.0:${getTlsPort()}`,
            UXPIN_ENV: Environment.TEST,
          },
          params: [Command.DUMP, '--webpack-config "./webpack.config.js"', '--config "./uxpin.invalid2.config.js"'],
        });
      } catch (error) {
        // then
        expect((error as any).stderr).toMatch(/Namespace \"Some\" does not exist/);
      }
    });
  });
});
