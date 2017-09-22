import { runUXPinCodeCommand } from '../../utils/command/runUXPinCodeCommand';

beforeAll(() => (jest as any).setTimeout(60000));
afterAll(() => (jest as any).setTimeout(5000));

describe('Building design system', () => {

  describe('arui-feather', () => {
    describe('without required babel plugins', () => {
      it('throws an error', () => {
        return runUXPinCodeCommand('resources/repos/arui-feather')
          .catch((error) => {
            expect(error).toContain('Module build failed');
          });
      });
    });

    describe('with required babel plugins', () => {
      let components:any;

      beforeAll(() => {
        const options:string = [
          '--babel-plugins "transform-decorators-legacy,transform-runtime?polyfill=false&helpers=false"',
          '--target "commonjs"',
        ].join(' ');

        return runUXPinCodeCommand('resources/repos/arui-feather', options)
          .then(() => {
            components = require('../../resources/repos/arui-feather/components.js');
          });
      });

      it('contains Button component', () => {
        // when
        const { Button } = components;
        // then
        expect(Button).toBeInstanceOf(Function);
      });
    });
  });

  describe('nordnet-ui-kit', () => {
    describe('without required babel plugins', () => {
      it('throws an error', () => {
        return runUXPinCodeCommand('resources/repos/nordnet-ui-kit')
          .catch((error) => {
            expect(error).toContain('Module build failed');
          });
      });
    });

    describe('with required babel plugins', () => {
      let components:any;

      beforeAll(() => {
        const options:string = [
          '--babel-plugins "transform-class-properties,transform-object-rest-spread"',
          '--target "commonjs"',
          '--wrapper "../documentation/wrapper.jsx"',
        ].join(' ');

        return runUXPinCodeCommand('resources/repos/nordnet-ui-kit', options)
          .then(() => {
            components = require('../../resources/repos/nordnet-ui-kit/components.js');
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
});
