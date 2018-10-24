import { existsSync } from 'fs';
import { readJson } from 'fs-extra';
import { join, resolve } from 'path';
import { DesignSystemSnapshot } from '../../../../src/types';
import { expectedMetadata } from '../../../resources/designSystems/twoComponentsWithConfig/expectedMetadata';
import { setTimeoutBeforeAll } from '../../../utils/command/setTimeoutBeforeAll';
import { setupExperimentationServerTest } from '../../../utils/experimentation/setupExperimentationServerTest';

const CURRENT_TIMEOUT:number = 30000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('Experimentation mode - save library metadata', () => {
  const projectPath:string = resolve(__dirname, '../../../resources/designSystems/twoComponentsWithConfig');

  const { getWorkingDir } = setupExperimentationServerTest({
    projectPath,
    serverCmdArgs: [
      '--webpack-config "./webpack.config.js"',
    ],
    useTempDir: true,
  });

  it('should create metadata.json file', () => {
    // then
    expect(existsSync(getMetadataPath())).toBeTruthy();
  });

  it('should metadata file match expected metadata', async () => {
    // when
    const metadataFile:DesignSystemSnapshot = await readJson(getMetadataPath());

    // then
    expect(metadataFile).toEqual(expectedMetadata);
  });

  function getMetadataPath():string {
    return join(getWorkingDir(), '.uxpin-merge', 'metadata.json');
  }
});
