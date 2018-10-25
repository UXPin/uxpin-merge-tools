import * as path from 'path';
import { getTempDirPath } from '../../../../src/program/args/providers/paths/getTempDirPath';
import { LIBRARY_OUTPUT_FILENAME } from '../../../../src/steps/building/config/getConfig';
import { setTimeoutBeforeAll } from '../../../utils/command/setTimeoutBeforeAll';
import { setupExperimentationServerTest } from '../../../utils/experimentation/setupExperimentationServerTest';
import { getFileChecksum } from '../../../utils/file/getFileChecksum';

const CURRENT_TIMEOUT:number = 300000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('Experimental - watch - change file content', () => {
  let bundleCheckSum:string;
  const projectDirPath:string = path.resolve(__dirname, '../../../resources/designSystems/watchingChanges');
  const { changeFileContent } = setupExperimentationServerTest({
    projectPath: projectDirPath,
    serverCmdArgs: [
      '--config "uxpin.config.js"',
      '--webpack-config "node_modules/react-scripts/config/webpack.config.dev.js"',
    ],
  });

  beforeAll(async () => {
    bundleCheckSum = await getBundleChecksum();
  });

  it('should update library output file when', async () => {
    // given
    const avatarJsxPath:string = path.resolve(projectDirPath, './src/components/Avatar/Avatar.jsx');
    const changedFileContent:string = `
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
    await changeFileContent(avatarJsxPath, changedFileContent);

    // then
    expect(await getBundleChecksum()).not.toEqual(bundleCheckSum);
  });

  function getBundleChecksum():Promise<string> {
    const tempDirPath:string = getTempDirPath({ cwd: projectDirPath });
    return getFileChecksum(path.resolve(tempDirPath, LIBRARY_OUTPUT_FILENAME));
  }
});
