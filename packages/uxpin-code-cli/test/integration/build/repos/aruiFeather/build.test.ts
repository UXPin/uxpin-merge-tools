import { relative, resolve } from 'path';

import { LIBRARY_OUTPUT_PATH } from '../../../../../src/config/webpack.config';
import { runUXPinCodeCommand } from '../../../../utils/command/runUXPinCodeCommand';
import { setTimeoutBeforeAll } from '../../../../utils/command/setTimeoutBeforeAll';

const CURRENT_TIMEOUT:number = 60000;

setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('Building repos/arui-feather design system', () => {
  // @todo fix running this test on ci
  // right now it ignores unsetting babel-loader 'babelrc' flag
  // see https://github.com/babel/babel-loader/issues/418
  describe.skip('with required babel plugins', () => {
    let components:any;

    beforeAll(() => {
      const options:string = [
        '--babel-plugins "transform-decorators-legacy,transform-runtime?polyfill=false&helpers=false"',
        '--target "commonjs"',
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

  describe('without required babel plugins', () => {
    it('throws an error', () => {
      return runUXPinCodeCommand('resources/repos/arui-feather')
        .then((output) => {
          expect(output).toContain('ERROR:');
          expect(output).toContain('Module build failed');
        });
    });
  });
});
