import * as path from 'path';
import { getTempDirPath } from '../../../../src/program/args/providers/paths/getTempDirPath';
import { LIBRARY_OUTPUT_FILENAME } from '../../../../src/steps/building/config/getConfig';
import { setTimeoutBeforeAll } from '../../../utils/command/setTimeoutBeforeAll';
import { setupExperimentationServerTest } from '../../../utils/experimentation/setupExperimentationServerTest';
import { getFileChecksum } from '../../../utils/file/getFileChecksum';

const CURRENT_TIMEOUT:number = 100000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('Experimental - watch - change file content with syntax error', () => {
  let initialBundleChecksum:string;
  const avatarJsxPath:string = './src/components/Avatar/Avatar.jsx';

  const avatarSyntaxErrorContent:string = `
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
      <<div className={size}>
        <img src={imageUrl} alt="Avatar" /> Changed content :boom:
      </div>
    );
  }
}

`;

  const avatarCorrectContent:string = `
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

  const { changeProjectFile, getWorkingDir } = setupExperimentationServerTest({
    projectPath: 'resources/designSystems/watchingChanges',
    serverCmdArgs: [
      '--config "uxpin.config.js"',
      '--webpack-config "node_modules/react-scripts/config/webpack.config.dev.js"',
    ],
    silent: true,
  });

  beforeAll(async () => {
    initialBundleChecksum = await getBundleChecksum();
  });

  describe('when component content has syntax error', () => {
    let errorResponse:string;
    beforeAll(async () => {
      try {
        await changeProjectFile(avatarJsxPath, avatarSyntaxErrorContent);
      } catch (error) {
        errorResponse = error;
      }
    });

    it('should display Parsing error message on stderr', () => {
      expect(errorResponse).toMatch(/ERROR: \.\/src\/components\/Avatar\/Avatar\.jsx/);
    });

    describe('when user fix content syntax error', () => {
      beforeAll(async () => {
        await changeProjectFile(avatarJsxPath, avatarCorrectContent);
      });

      it('should update library bundle', async () => {
        expect(await getBundleChecksum()).not.toEqual(initialBundleChecksum);
      });
    });
  });

  function getBundleChecksum():Promise<string> {
    const tempDirPath:string = getTempDirPath({ cwd: getWorkingDir() });
    return getFileChecksum(path.resolve(tempDirPath, LIBRARY_OUTPUT_FILENAME));
  }
});
