import { pathExists } from 'fs-extra';
import { getTempDirPath } from '../../../src/program/args/providers/paths/getTempDirPath';
import { runUXPinMergeCommand } from '../../utils/command/runUXPinMergeCommand';
import { setupExperimentationServerTest } from '../../utils/experimentation/setupExperimentationServerTest';

describe('cleanCommand', () => {
  const cwd:string = __dirname;

  setupExperimentationServerTest({
    projectPath: cwd,
  });

  it('should remove temporary directory', async () => {
    // when
    await runUXPinMergeCommand({ cwd, params: ['clean'] });

    // then
    expect(await pathExists(getTempDirPath({ cwd }))).toEqual(false);
  });
});
