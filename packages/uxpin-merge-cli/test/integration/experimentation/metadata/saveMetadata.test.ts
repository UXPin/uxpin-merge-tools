import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { TEMP_DIR_PATH } from '../../../../src/steps/building/config/getConfig';
import { METADATA_FILE_NAME } from '../../../../src/steps/experimentation/metadata/saveMetadata';
import { setTimeoutBeforeAll } from '../../../utils/command/setTimeoutBeforeAll';
import { setupExperimentationServerTest } from '../../../utils/experimentation/setupExperimentationServerTest';

const CURRENT_TIMEOUT:number = 30000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('Experimentation mode - save library metadata', () => {
  const projectPath:string = resolve(__dirname, '../../../resources/repos/mineral-ui');
  const metadataFilePath:string = resolve(projectPath, TEMP_DIR_PATH, METADATA_FILE_NAME);

  setupExperimentationServerTest({
    projectPath,
    serverCmdArgs: [
      '--webpack-config "./webpack.config.js"',
      '--wrapper "./src/library/themes/UXPinWrapper.js"',
    ],
  });

  it('should create metadata.json file', () => {
    expect(existsSync(metadataFilePath)).toBeTruthy();
  });

  it('should metadata file match snapshot', () => {
    // given
    const metadataFile:string = readFileSync(metadataFilePath).toString('utf-8');

    // then
    expect(metadataFile).toMatchSnapshot();
  });
});
