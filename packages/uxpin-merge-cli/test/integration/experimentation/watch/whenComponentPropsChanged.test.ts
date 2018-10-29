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

describe('Experimental - watch - change file content', () => {
  let initialBundleChecksum:string;
  let initialMetadata:string;
  const buttonJSXPath:string = './src/components/Button/Button.jsx';

  const { changeProjectFile, getWorkingDir } = setupExperimentationServerTest({
    projectPath: 'resources/designSystems/watchingChanges',
    serverCmdArgs: [
      '--config "uxpin.config.js"',
      '--webpack-config "node_modules/react-scripts/config/webpack.config.dev.js"',
    ],
  });

  const changedFileContent:string = `
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { classNames } from '../../utils/classNames';
import './button.css'

export default class Button extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    disabled: PropTypes.bool,
    primary: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    disabled: false,
  };

  render() {
    const { children, disabled, primary } = this.props;
    const className = classNames({
      'watch__btn': true,
      'watch__btn--primary': primary,
    });

    return (
      <button className={className} disabled={disabled}>
        {children}
      </button>
    );
  }
}

`;

  beforeAll(async () => {
    // given
    initialBundleChecksum = await getBundleChecksum();
    initialMetadata = await getMetadataChecksum();

    // when
    await changeProjectFile(buttonJSXPath, changedFileContent);
  });

  it('should update library bundle when component props changed', async () => {
    expect(await getBundleChecksum()).not.toEqual(initialBundleChecksum);
  });

  it('should update metadata file when props changed', async () => {
    expect(await getMetadataChecksum()).not.toEqual(initialMetadata);
  });

  it('should metadata has added new props from changed file', async () => {
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
                        primary: true,
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
                  defaultValue: {
                    value: false,
                  },
                  description: '',
                  isRequired: false,
                  name: 'disabled',
                  type: {
                    name: 'boolean',
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
