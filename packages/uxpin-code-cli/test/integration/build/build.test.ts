import { runUXPinCodeCommand } from '../../utils/runUXPinCodeCommand';

beforeAll(() => jest.setTimeout(60000));
afterAll(() => jest.setTimeout(5000);

describe('Building design system', () => {
  describe('nordnet-ui-kit', () => {
    describe('without custom libraries', () => {
      it('throws an error', () => {
        return runUXPinCodeCommand('resources/repos/nordnet-ui-kit')
          .catch((error) => {
            expect(error).toContain('Module build failed');
          });
      });
    });

    describe('with custom libraries', () => {
      let components:any;

      beforeAll(() => {
        const options:string = [
          '--libraries "transform-class-properties,transform-object-rest-spread"',
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
