import { readJson } from 'fs-extra';
import * as path from 'path';
import { getTempDirPath } from '../../../../src/program/args/providers/paths/getTempDirPath';
import { LIBRARY_OUTPUT_FILENAME } from '../../../../src/steps/building/config/getConfig';
import { METADATA_FILE_NAME } from '../../../../src/steps/experimentation/metadata/saveMetadata';
import { DesignSystemSnapshot } from '../../../../src/steps/serialization/DesignSystemSnapshot';
import {
  expectedButtonDefinition,
  expectedDSWatchingChangesMetadata,
} from '../../../resources/designSystems/watchingChanges/.uxpin-merge/expectedDSWatchingChangesMetadata';
import { setTimeoutBeforeAll } from '../../../utils/command/setTimeoutBeforeAll';
import { setupExperimentationServerTest } from '../../../utils/experimentation/setupExperimentationServerTest';
import { getFileChecksum } from '../../../utils/file/getFileChecksum';

const CURRENT_TIMEOUT:number = 60000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('Experimental - watch - change file content (changed prop types)', () => {
  let initialBundleChecksum:string;
  let initialMetadata:string;
  const buttonJSXPath:string = './src/components/Button/Button.jsx';

  const { changeProjectFile, getWorkingDir } = setupExperimentationServerTest({
    projectPath: 'resources/designSystems/watchingChanges',
    serverCmdArgs: [
      '--config "uxpin.config.js"',
      '--webpack-config "node_modules/react-scripts/config/webpack.config.dev.js"',
      '--uxpin-api-domain "0.0.0.0:7448"',
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
      ...expectedDSWatchingChangesMetadata,
      categorizedComponents: [
        expectedDSWatchingChangesMetadata.categorizedComponents[0],
        {
          ...expectedDSWatchingChangesMetadata.categorizedComponents[1],
          components: [
            {
              ...expectedButtonDefinition,
              properties: [
                expectedButtonDefinition.properties[0],
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
                expectedButtonDefinition.properties[1],
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
