import { readJson } from 'fs-extra';
import * as path from 'path';
import { getTempDirPath } from '../../../../src/program/args/providers/paths/getTempDirPath';
import { LIBRARY_OUTPUT_FILENAME } from '../../../../src/steps/building/config/getConfig';
import { METADATA_FILE_NAME } from '../../../../src/steps/experimentation/metadata/saveMetadata';
import { DesignSystemSnapshot } from '../../../../src/steps/serialization/DesignSystemSnapshot';
import { setTimeoutBeforeAll } from '../../../utils/command/setTimeoutBeforeAll';
import { setupExperimentationServerTest } from '../../../utils/experimentation/setupExperimentationServerTest';
import { getFileChecksum } from '../../../utils/file/getFileChecksum';

const CURRENT_TIMEOUT:number = 60000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('Experimental - watch - when component presets has changed', () => {
  let initialBundleChecksum:string;
  let initialMetadata:string;
  const { changeFileContent, getWorkingDir } = setupExperimentationServerTest({
    projectPath: 'resources/designSystems/watchingChanges',
    serverCmdArgs: [
      '--config "uxpin.config.js"',
      '--webpack-config "node_modules/react-scripts/config/webpack.config.dev.js"',
    ],
  });

  const changedFileContent:string = `
{
  "rootId": "1",
  "elements": {
    "1": {
      "name": "Button",
      "props": {
        "children": "Click me",
        "primary": false
      }
    }
  }
}

`;

  beforeAll(async () => {
    // given
    initialBundleChecksum = await getBundleChecksum();
    initialMetadata = await getMetadataChecksum();
    const buttonPresetsPath:string = path.resolve(getWorkingDir(), './src/components/Button/presets/0-default.json');

    // when
    await changeFileContent(buttonPresetsPath, changedFileContent);
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
      categorizedComponents: [
        {
          components: [
            {
              documentation: {
                examples: [],
              },
              info: {
                dirPath: 'src/components/Avatar',
                implementation: {
                  framework: 'reactjs',
                  lang: 'javascript',
                  path: 'src/components/Avatar/Avatar.jsx',
                },
                presets: [
                  {
                    path: 'src/components/Avatar/presets/0-default.json',
                  },
                ],
              },
              name: 'Avatar',
              presets: [
                {
                  elements: {
                    1: {
                      name: 'Avatar',
                      props: {
                        imageUrl: 'https://placekitten.com/200/300',
                      },
                    },
                  },
                  name: 'default',
                  rootId: '1',
                },
              ],
              properties: [
                {
                  defaultValue: {
                    value: '',
                  },
                  description: '',
                  isRequired: true,
                  name: 'size',
                  type: {
                    name: 'union',
                    structure: {
                      elements: [
                        {
                          name: 'literal',
                          structure: {
                            value: 'xs',
                          },
                        },
                        {
                          name: 'literal',
                          structure: {
                            value: 's',
                          },
                        },
                        {
                          name: 'literal',
                          structure: {
                            value: 'l',
                          },
                        },
                        {
                          name: 'literal',
                          structure: {
                            value: 'xl',
                          },
                        },
                      ],
                    },
                  },
                },
                {
                  description: '',
                  isRequired: true,
                  name: 'imageUrl',
                  type: {
                    name: 'string',
                    structure: {},
                  },
                },
              ],
            },
          ],
          name: 'General',
        },
        {
          components: [
            {
              documentation: {
                examples: [],
              },
              info: {
                dirPath: 'src/components/Button',
                implementation: {
                  framework: 'reactjs',
                  lang: 'javascript',
                  path: 'src/components/Button/Button.jsx',
                },
                presets: [
                  {
                    path: 'src/components/Button/presets/0-default.json',
                  },
                ],
              },
              name: 'Button',
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
              properties: [
                {
                  description: '',
                  isRequired: false,
                  name: 'children',
                  type: {
                    name: 'node',
                    structure: {},
                  },
                },
                {
                  description: '',
                  isRequired: true,
                  name: 'primary',
                  type: {
                    name: 'boolean',
                    structure: {},
                  },
                },
              ],
            },
          ],
          name: 'Forms',
        },
      ],
      name: '',
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
