import { relative, resolve } from 'path';

import { LIBRARY_OUTPUT_PATH } from '../../../../../src/config/webpack.config';
import { runUXPinCodeCommand } from '../../../../utils/command/runUXPinCodeCommand';
import { setTimeoutBeforeAll } from '../../../../utils/command/setTimeoutBeforeAll';

const CURRENT_TIMEOUT:number = 60000;

setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('Building repos/nordnet-ui-kit design system', () => {
  describe('with required babel plugins', () => {
    let components:any;

    beforeAll(() => {
      const options:string = [
        '--target "commonjs"',
        '--wrapper "../documentation/wrapper.jsx"',
      ].join(' ');

      return runUXPinCodeCommand('resources/repos/nordnet-ui-kit', options)
        .then(() => {
          const path:string = relative(__dirname, resolve('test/resources/repos/nordnet-ui-kit', LIBRARY_OUTPUT_PATH));
          components = require(path);
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
  });
});
