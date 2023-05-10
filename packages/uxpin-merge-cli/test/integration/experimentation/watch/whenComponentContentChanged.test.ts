import * as path from 'path';
import { getTempDirPath } from '../../../../src/program/args/providers/paths/getTempDirPath';
import { LIBRARY_OUTPUT_FILENAME } from '../../../../src/steps/building/config/getConfig';
import { setupExperimentationServerTest } from '../../../utils/experimentation/setupExperimentationServerTest';
import { getFileChecksum } from '../../../utils/file/getFileChecksum';

const CURRENT_TIMEOUT = 60000;

describe('Experimental - watch - change file content', () => {
  let initialBundleChecksum: string;
  const avatarJsxPath = './src/components/Avatar/Avatar.jsx';

  const { changeProjectFile, getWorkingDir } = setupExperimentationServerTest({
    projectPath: 'resources/designSystems/watchingChanges',
    serverCmdArgs: ['--config "uxpin.config.js"', '--webpack-config "./webpack.config.js"'],
    timeout: CURRENT_TIMEOUT,
  });

  beforeAll(async () => {
    initialBundleChecksum = await getBundleChecksum();
  }, CURRENT_TIMEOUT);

  it('should update library bundle when component changed', async () => {
    // given
    const changedFileContent = `
import PropTypes from 'prop-types';
import React from 'react';
import { PureComponent } from 'react';

export default class Avatar extends PureComponent {
  static propTypes = {
    size: PropTypes.oneOf(['xs', 's', 'l', 'xl']).isRequired,
    imageUrl: PropTypes.string.isRequired,
  };

  static defaultProps = {
    size: '',
  };

  render() {
    const { imageUrl, size } = this.props;
    return (
      <div className={size}>
        <img src={imageUrl} alt="Avatar" /> Changed content :boom:
      </div>
    );
  }
}

`;

    // when
    await changeProjectFile(avatarJsxPath, changedFileContent);

    // then
    expect(await getBundleChecksum()).not.toEqual(initialBundleChecksum);
  });

  function getBundleChecksum(): Promise<string> {
    const tempDirPath: string = getTempDirPath({ cwd: getWorkingDir() });
    return getFileChecksum(path.resolve(tempDirPath, LIBRARY_OUTPUT_FILENAME));
  }
});
