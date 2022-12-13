import * as path from 'path';
import { getTempDirPath } from '../../../../src/program/args/providers/paths/getTempDirPath';
import { LIBRARY_OUTPUT_FILENAME } from '../../../../src/steps/building/config/getConfig';
import { setTimeoutBeforeAll } from '../../../utils/command/setTimeoutBeforeAll';
import { setupExperimentationServerTest } from '../../../utils/experimentation/setupExperimentationServerTest';
import { getFileChecksum } from '../../../utils/file/getFileChecksum';

const CURRENT_TIMEOUT = 100000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('Experimental - watch - imported file from component changed', () => {
  let initialBundleChecksum: string;
  const { changeProjectFile, getWorkingDir } = setupExperimentationServerTest({
    projectPath: 'resources/designSystems/watchingChanges',
    serverCmdArgs: ['--config "uxpin.config.js"', '--webpack-config "./webpack.config.js"'],
  });

  beforeAll(async () => {
    initialBundleChecksum = await getBundleChecksum();
  });

  it('should update library bundle when imported file changed', async () => {
    // given
    const cssFilePath = './src/components/Button/button.css';
    const changedCss = `
.watch__btn {
    width: 100%;
    height: 100%;
    color: black;
    background: magenta;
    border: 1px solid grey;
}

.watch__btn--primary {
    color: white;
    background: darkblue;
}

`;

    // when
    await changeProjectFile(cssFilePath, changedCss);

    // then
    expect(getBundleChecksum()).not.toEqual(initialBundleChecksum);
  });

  function getBundleChecksum(): Promise<string> {
    const tempDirPath: string = getTempDirPath({ cwd: getWorkingDir() });
    return getFileChecksum(path.resolve(tempDirPath, LIBRARY_OUTPUT_FILENAME));
  }
});
