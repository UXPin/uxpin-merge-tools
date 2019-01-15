import { readJson } from 'fs-extra';
import * as path from 'path';
import { getTempDirPath } from '../../../../src/program/args/providers/paths/getTempDirPath';
import { LIBRARY_OUTPUT_FILENAME } from '../../../../src/steps/building/config/getConfig';
import { METADATA_FILE_NAME } from '../../../../src/steps/experimentation/metadata/saveMetadata';
import { DesignSystemSnapshot } from '../../../../src/steps/serialization/DesignSystemSnapshot';
import { expectedButtonDefinition, expectedDSWatchingChangesMetadata } from '../../../resources/designSystems/watchingChanges/.uxpin-merge/expectedDSWatchingChangesMetadata';
import { setTimeoutBeforeAll } from '../../../utils/command/setTimeoutBeforeAll';
import { setupExperimentationServerTest } from '../../../utils/experimentation/setupExperimentationServerTest';
import { getFileChecksum } from '../../../utils/file/getFileChecksum';

const CURRENT_TIMEOUT:number = 60000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('Experimental - watch - when component presets has changed', () => {
  let initialBundleChecksum:string;
  let initialMetadata:string;
  const { changeProjectFile, getWorkingDir } = setupExperimentationServerTest({
    projectPath: 'resources/designSystems/watchingChanges',
    serverCmdArgs: [
      '--config "uxpin.config.js"',
      '--webpack-config "./webpack.config.js"',
    ],
  });

  const changedFileContent:string = `
import React from 'react';
import Button from '../Button';

export default (
  <Button uxpId="1" primary={false}>Click me</Button>
);
`;

  beforeAll(async () => {
    // given
    initialBundleChecksum = await getBundleChecksum();
    initialMetadata = await getMetadataChecksum();
    const buttonPresetsPath:string = './src/components/Button/presets/0-default.jsx';

    // when
    await changeProjectFile(buttonPresetsPath, changedFileContent);
  });

  it('should not change library bundle when only component presets changed', async () => {
    expect(await getBundleChecksum()).toEqual(initialBundleChecksum);
  });

  it('should update metadata file', async () => {
    expect(await getMetadataChecksum()).not.toEqual(initialMetadata);
  });

  it('should update metadata file with new presets', async () => {
    // given
    const expectedMetadata:DesignSystemSnapshot = {
      ...expectedDSWatchingChangesMetadata,
      categorizedComponents: [
        expectedDSWatchingChangesMetadata.categorizedComponents[0],
        {
          ...expectedDSWatchingChangesMetadata.categorizedComponents[1],
          components: [
            {
              ...expectedButtonDefinition,
              presets: [
                {
                  elements: {
                    1: {
                      name: 'Button',
                      props: {
                        children: 'Click me',
                        primary: false,
                      },
                    },
                  },
                  name: 'default',
                  rootId: '1',
                },
              ],
            },
          ],
        },
      ],
    };

    // when
    const metadataFile:DesignSystemSnapshot = await readJson(getMetadataPath());

    // then
    expect(metadataFile).toEqual(expectedMetadata);
  });

  function getBundleChecksum():Promise<string> {
    const tempDirPath:string = getTempDirPath({ cwd: getWorkingDir() });
    return getFileChecksum(path.resolve(tempDirPath, LIBRARY_OUTPUT_FILENAME));
  }

  function getMetadataChecksum():Promise<string> {
    return getFileChecksum(getMetadataPath());
  }

  function getMetadataPath():string {
    const tempDirPath:string = getTempDirPath({ cwd: getWorkingDir() });
    return path.resolve(tempDirPath, METADATA_FILE_NAME);
  }
});
