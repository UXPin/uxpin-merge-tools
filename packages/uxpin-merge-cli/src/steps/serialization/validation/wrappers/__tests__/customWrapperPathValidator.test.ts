import { resolve } from 'path';
import { Warned } from '../../../../../common/warning/Warned';
import { ComponentImplementationInfo } from '../../../../discovery/component/ComponentInfo';
import { BuiltInWrappers, ComponentWrapper, ComponentWrapperType } from '../../../component/wrappers/ComponentWrapper';
import { customWrapperPathValidator } from '../customWrapperPathValidator';

describe('customWrapperPathValidator', () => {
  const implInfo: ComponentImplementationInfo = {
    framework: 'reactjs',
    lang: 'typescript',
    path: resolve(__dirname, '../../../../../../', 'test/resources/designSystems/withWrappers/Button.js'),
  };

  describe('when custom wrapper with valid path is provided', () => {
    it('should return warned object without warnings', () => {
      // having
      const wrappers: Array<Warned<ComponentWrapper>> = [
        {
          result: {
            name: 'CustomWrapper',
            path: './CustomWrapperPlaceholder.ts',
            type: ComponentWrapperType.CUSTOM,
          },
          warnings: [],
        },
      ];

      // when
      // then
      expect(customWrapperPathValidator(wrappers, implInfo)).toEqual([
        {
          result: {
            name: 'CustomWrapper',
            path: './CustomWrapperPlaceholder.ts',
            type: ComponentWrapperType.CUSTOM,
          },
          warnings: [],
        },
      ]);
    });
  });

  describe('when custom wrapper with invalid path is provided', () => {
    it('should return warned object with warning', () => {
      // having
      const wrappers: Array<Warned<ComponentWrapper>> = [
        {
          result: {
            name: 'CustomWrapper',
            path: './NonExistingPath.ts',
            type: ComponentWrapperType.CUSTOM,
          },
          warnings: [],
        },
      ];

      // when
      // then
      expect(customWrapperPathValidator(wrappers, implInfo)).toEqual([
        {
          result: {
            name: 'CustomWrapper',
            path: './NonExistingPath.ts',
            type: ComponentWrapperType.CUSTOM,
          },
          warnings: [{ message: 'Invalid wrapper path "./NonExistingPath.ts"!' }],
        },
      ]);
    });
  });

  describe('when built in wrapper is provided', () => {
    it('should return object withour warnings', () => {
      // having
      const wrappers: Array<Warned<ComponentWrapper>> = [
        {
          result: {
            name: BuiltInWrappers.NON_RESIZABLE_WRAPPER,
            type: ComponentWrapperType.BUILT_IN,
          },
          warnings: [],
        },
      ];

      // when
      // then
      expect(customWrapperPathValidator(wrappers, implInfo)).toEqual([
        {
          result: {
            name: BuiltInWrappers.NON_RESIZABLE_WRAPPER,
            type: ComponentWrapperType.BUILT_IN,
          },
          warnings: [],
        },
      ]);
    });
  });
});
