import { relative, resolve } from 'path';

import { LIBRARY_OUTPUT_PATH } from '../../../../../src/steps/building/config/getConfig';
import { runUXPinCodeCommand } from '../../../../utils/command/runUXPinCodeCommand';
import { setTimeoutBeforeAll } from '../../../../utils/command/setTimeoutBeforeAll';

const CURRENT_TIMEOUT:number = 75000;

setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('Building repos/nordnet-ui-kit design system', () => {
  describe('with required user webpack config', () => {
    let components:any;
    let consoleOutput:string;

    beforeAll(() => {
      const params:string[] = [
        '--webpack-config "../../configs/nordnet-ui-kit-webpack.config.js"',
        '--config="../../configs/nordnet-ui-kit-uxpin.config.js"',
        '--wrapper "../documentation/wrapper.jsx"',
      ];

      return runUXPinCodeCommand({ cwd: 'resources/repos/nordnet-ui-kit', params })
        .then((output) => {
          const path:string = relative(__dirname, resolve('test/resources/repos/nordnet-ui-kit', LIBRARY_OUTPUT_PATH));
          components = require(path);
          consoleOutput = output;
        });
    });

    it('contains Button component', () => {
      // when
      const { Button } = components;
      // then
      expect(Button).toBeInstanceOf(Function);
    });

    it('contains custom wrapper', () => {
      // when
      const { Wrapper } = components;
      // then
      expect(Wrapper).toBeInstanceOf(Function);
    });

    it('prints warnings without stack traces to the console', () => {
      // then
      expect(consoleOutput).toMatchSnapshot();
    });
  });

  describe('without required user webpack config', () => {
    it('throws an error', () => {
      return runUXPinCodeCommand({ cwd: 'resources/repos/nordnet-ui-kit' })
        .then((output) => {
          expect(output).toContain('ERROR:');
          expect(output).toContain('Module parse failed');
        });
    });
  });
});
