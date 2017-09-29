import { relative, resolve } from 'path';

import { LIBRARY_OUTPUT_PATH } from '../../../../../src/config/webpack.config';
import { runUXPinCodeCommand } from '../../../../utils/command/runUXPinCodeCommand';
import { setTimeoutBeforeAll } from '../../../../utils/command/setTimeoutBeforeAll';

const CURRENT_TIMEOUT:number = 60000;

setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('Building repos/arui-feather design system', () => {
  describe('with required user webpack config', () => {
    let components:any;

    beforeAll(() => {
      const options:string = [
        '--target "commonjs"',
        '--webpack-config "./webpack.gemini.config.js"',
      ].join(' ');

      return runUXPinCodeCommand('resources/repos/arui-feather', options)
        .then(() => {
          const path:string = relative(__dirname, resolve('test/resources/repos/arui-feather', LIBRARY_OUTPUT_PATH));
          components = require(path);
        });
    });

    it('contains Button component', () => {
      // when
      const { Button } = components;
      // then
      expect(Button).toBeInstanceOf(Function);
    });
  });

  describe('without required user webpack config', () => {
    it('throws an error', () => {
      return runUXPinCodeCommand('resources/repos/arui-feather')
        .then((output) => {
          expect(output).toContain('ERROR:');
          expect(output).toContain('Module parse failed');
        });
    });
  });
});
