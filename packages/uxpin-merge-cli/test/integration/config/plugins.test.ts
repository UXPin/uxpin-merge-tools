import { resolve } from 'path';
import { DirectoryResult } from 'tmp-promise';
import { Command } from '../../../src';
import { Environment } from '../../../src/program/env/Environment';
import { runUXPinMergeCommand } from '../../utils/command/runUXPinMergeCommand';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';
import { setupTempProject } from '../../utils/temp/setupTempProject';

const CURRENT_TIMEOUT:number = 60000;

setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('Plugins support', () => {
  const sourceDir:string = resolve(__dirname, '../../resources/designSystems/twoComponentsWithConfig');
  const projectPath:string = resolve(__dirname, '../../../');
  const { getDirectory } = setupTempProject({
    gitOptions: { initialise: true },
    linkPackage: true,
    projectPath,
    sourceDir,
  });

  it('it should be possible to serialize component using custom plugin', async () => {
    // having
    const dir:DirectoryResult = getDirectory();

    // when
    const result:string = await runUXPinMergeCommand({
      cwd: dir.path,
      env: {
        UXPIN_ENV: Environment.TEST,
      },
      params: [
        Command.DUMP,
        '--config "./uxpin.plugin.config.js"',
        '--webpack-config "./webpack.config.js"',
      ],
    });

    // then
    expect(JSON.parse(result)).toMatchSnapshot({
      vcs: expect.objectContaining({
        branchName: expect.any(String),
        commitHash: expect.stringMatching(/[a-z0-9]+/),
      }),
    });
  });
});
