import { existsSync } from 'fs';
import { resolve } from 'path';
import { TEMP_DIR_PATH } from '../../../../src/steps/building/config/getConfig';
import { getMetadataFilePath } from '../../../../src/steps/experimentation/metadata/getMetadataFilePath';
import { getProjectMetadata } from '../../../../src/steps/experimentation/metadata/getProjectMetadata';
import { DesignSystemSnapshot } from '../../../../src/types';
import { setTimeoutBeforeAll } from '../../../utils/command/setTimeoutBeforeAll';
import { setupExperimentationServerTest } from '../../../utils/experimentation/setupExperimentationServerTest';

const CURRENT_TIMEOUT:number = 30000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('Experimentation mode - save library metadata', () => {
  const projectPath:string = resolve(__dirname, '../../../resources/repos/mineral-ui');
  const uxpinDirPath:string = resolve(projectPath, TEMP_DIR_PATH);

  setupExperimentationServerTest({
    projectPath,
    serverCmdArgs: [
      '--webpack-config "./webpack.config.js"',
      '--wrapper "./src/library/themes/UXPinWrapper.js"',
    ],
  });

  it('should create metadata.json file', () => {
    expect(existsSync(getMetadataFilePath(uxpinDirPath))).toBeTruthy();
  });

  it('should metadata file match snapshot', async () => {
    // given
    const metadataFile:DesignSystemSnapshot = await getProjectMetadata(uxpinDirPath);

    // then
    expect(metadataFile).toMatchSnapshot();
  });
});
