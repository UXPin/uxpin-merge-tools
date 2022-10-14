import { Warned } from '../../../../../common/warning/Warned';
import { ComponentImplementationInfo } from '../../../../discovery/component/ComponentInfo';
import { BuiltInWrappers, ComponentWrapper, ComponentWrapperType } from '../../../component/wrappers/ComponentWrapper';
import { builtInWrapperValidator } from '../builtInWrapperValidator';

describe('isBuiltInWrapperValidator', () => {
  const implInfo: ComponentImplementationInfo = {
    framework: 'reactjs',
    lang: 'typescript',
    path: './somePath/',
  };

  describe('when warned array of valid built in wrappers is provided', () => {
    it('should return this array without any warnings', () => {
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
      expect(builtInWrapperValidator(wrappers, implInfo)).toEqual([
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

  describe('when warned array of invalid built in wrappers is provided', () => {
    it('should return array with warnings', () => {
      // having
      const wrappers: Array<Warned<ComponentWrapper>> = [
        {
          result: {
            name: 'SomeFancyName',
            type: ComponentWrapperType.BUILT_IN,
          },
          warnings: [],
        },
      ];

      // when
      // then
      expect(builtInWrapperValidator(wrappers, implInfo)).toEqual([
        {
          result: {
            name: 'SomeFancyName',
            type: ComponentWrapperType.BUILT_IN,
          },
          warnings: [{ message: 'Unknown built in wrapper "SomeFancyName"!' }],
        },
      ]);
    });
  });

  describe('when warned array with custom wrapper is provided', () => {
    it('should return array without warnings', () => {
      // having
      const wrappers: Array<Warned<ComponentWrapper>> = [
        {
          result: {
            name: 'CustomWrapperName',
            path: '../path',
            type: ComponentWrapperType.CUSTOM,
          },
          warnings: [],
        },
      ];

      // when
      // then
      expect(builtInWrapperValidator(wrappers, implInfo)).toEqual([
        {
          result: {
            name: 'CustomWrapperName',
            path: '../path',
            type: ComponentWrapperType.CUSTOM,
          },
          warnings: [],
        },
      ]);
    });
  });

  describe('when warned array with custom wrapper with name reserved for built in wrapper is provided', () => {
    it('should return array without warnings', () => {
      // having
      const wrappers: Array<Warned<ComponentWrapper>> = [
        {
          result: {
            name: 'NonResizableWrapper',
            path: '../path',
            type: ComponentWrapperType.CUSTOM,
          },
          warnings: [],
        },
      ];

      // when
      // then
      expect(builtInWrapperValidator(wrappers, implInfo)).toEqual([
        {
          result: {
            name: 'NonResizableWrapper',
            path: '../path',
            type: ComponentWrapperType.CUSTOM,
          },
          warnings: [{ message: '"NonResizableWrapper" is a reserved name for built in validators!' }],
        },
      ]);
    });
  });
});
