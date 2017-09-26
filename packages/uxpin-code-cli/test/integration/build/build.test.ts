import { relative, resolve } from 'path';

import { LIBRARY_OUTPUT_PATH } from '../../../src/config/webpack.config';
import { runCommand } from '../../utils/command/runCommand';
import { runUXPinCodeCommand } from '../../utils/command/runUXPinCodeCommand';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';

const CURRENT_TIMEOUT:number = 60000;

const getDesignSystemLibraryRelativePath:(designSystemDir:string) => string = (designSystemDir) =>
  relative(__dirname, resolve(`test/resources/repos/${designSystemDir}`, LIBRARY_OUTPUT_PATH));

setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('Building design system', () => {

  describe('repos/arui-feather', () => {
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
            components = require(getDesignSystemLibraryRelativePath('arui-feather'));
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

  describe('repos/nordnet-ui-kit', () => {
    describe('with required babel plugins', () => {
      let components:any;

      beforeAll(() => {
        const options:string = [
          '--target "commonjs"',
          '--wrapper "../documentation/wrapper.jsx"',
        ].join(' ');

        return runUXPinCodeCommand('resources/repos/nordnet-ui-kit', options)
          .then(() => {
            components = require(getDesignSystemLibraryRelativePath('nordnet-ui-kit'));
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

  describe('designSystems/cantWriteToUxpinTemp', () => {
    const workingDir:string = 'resources/designSystems/cantWriteToUxpinTemp';

    it('shows permission denied Error when can not write to temporary directory', () => {
      return runCommand(`chmod 444 test/${workingDir}/.uxpin-temp`)
        .then(() => runUXPinCodeCommand(workingDir))
        .then((output) => {
          expect(output).toContain('ERROR:');
          expect(output).toContain('EACCES: permission denied');
        });
    });
  });
});
