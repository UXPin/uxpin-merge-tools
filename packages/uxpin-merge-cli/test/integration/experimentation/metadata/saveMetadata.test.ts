import { existsSync } from 'fs';
import { readJson } from 'fs-extra';
import { join } from 'path';
import { TEMP_DIR_NAME } from '../../../../src/steps/building/config/getConfig';
import { METADATA_FILE_NAME } from '../../../../src/steps/experimentation/metadata/saveMetadata';
import { DesignSystemSnapshot } from '../../../../src/types';
import { expectedMetadata } from '../../../resources/designSystems/twoComponentsWithConfig/expectedMetadata';
import { setupExperimentationServerTest } from '../../../utils/experimentation/setupExperimentationServerTest';

const CURRENT_TIMEOUT = 30000;

describe('Experimentation mode - save library metadata', () => {
  const { getWorkingDir } = setupExperimentationServerTest({
    projectPath: 'resources/designSystems/twoComponentsWithConfig',
    serverCmdArgs: ['--webpack-config "./webpack.config.js"'],
    timeout: CURRENT_TIMEOUT,
  });

  it('should create metadata.json file', () => {
    // then
    expect(existsSync(getMetadataPath())).toBeTruthy();
  });

  it('should metadata file match expected metadata', async () => {
    // when
    const metadataFile: DesignSystemSnapshot = await readJson(getMetadataPath());

    // then
    expect(metadataFile).toEqual(expect.objectContaining(expectedMetadata));
  });

  function getMetadataPath(): string {
    return join(getWorkingDir(), TEMP_DIR_NAME, METADATA_FILE_NAME);
  }
});
