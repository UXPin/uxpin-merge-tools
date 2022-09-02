import { ComponentWrapper, ComponentWrapperType } from '../ComponentWrapper';
import { parseWrapperAnnotation } from '../parseWrapperAnnotation';

describe('parseWrapperAnnotation', () => {
  describe('when empty tag is provided', () => {
    it('should return an empty array', () => {
      // having
      const tag = '';

      // when
      const wrappers: ComponentWrapper[] = parseWrapperAnnotation(tag);

      // then
      expect(wrappers).toEqual([]);
    });
  });

  describe('when invalid tag is provided', () => {
    it('should return an empty array', () => {
      // having
      const tag = '@uxpincomponent';

      // when
      const wrappers: ComponentWrapper[] = parseWrapperAnnotation(tag);

      // then
      expect(wrappers).toEqual([]);
    });
  });

  describe('when tag with single wrapper is provided', () => {
    describe('and it is a built in wrapper', () => {
      it('should return array with this wrapper', () => {
        // having
        const tag = '@uxpinwrappers NonResizableWrapper';
        const expectedWrappers: ComponentWrapper[] = [
          {
            name: 'NonResizableWrapper',
            type: ComponentWrapperType.BUILT_IN,
          },
        ];

        // when
        const wrappers: ComponentWrapper[] = parseWrapperAnnotation(tag);

        // then
        expect(wrappers).toEqual(expectedWrappers);
      });
    });

    describe('and it is a custom wrapper', () => {
      it('should return array with this wrapper', () => {
        // having
        const tag = '@uxpinwrappers ./path/to/customWrapper';
        const expectedWrappers: ComponentWrapper[] = [
          {
            name: 'customWrapper',
            path: './path/to/customWrapper',
            type: ComponentWrapperType.CUSTOM,
          },
        ];

        // when
        const wrappers: ComponentWrapper[] = parseWrapperAnnotation(tag);

        // then
        expect(wrappers).toEqual(expectedWrappers);
      });
    });
  });

  describe('when multiple wrappers are passed', () => {
    describe('in a single line comment', () => {
      it('should return array of wrappers', () => {
        // having
        const tag = '@uxpinwrappers ./path/to/customWrapper, NonResizableWrapper';
        const expectedWrappers: ComponentWrapper[] = [
          {
            name: 'customWrapper',
            path: './path/to/customWrapper',
            type: ComponentWrapperType.CUSTOM,
          },
          {
            name: 'NonResizableWrapper',
            type: ComponentWrapperType.BUILT_IN,
          },
        ];

        // when
        const wrappers: ComponentWrapper[] = parseWrapperAnnotation(tag);

        // then
        expect(wrappers).toEqual(expectedWrappers);
      });
    });

    describe('in a multi line comment', () => {
      it('should return array of wrappers', () => {
        // having
        const tag = `@uxpinwrappers
./path/to/customWrapper,
NonResizableWrapper`;
        const expectedWrappers: ComponentWrapper[] = [
          {
            name: 'customWrapper',
            path: './path/to/customWrapper',
            type: ComponentWrapperType.CUSTOM,
          },
          {
            name: 'NonResizableWrapper',
            type: ComponentWrapperType.BUILT_IN,
          },
        ];

        // when
        const wrappers: ComponentWrapper[] = parseWrapperAnnotation(tag);

        // then
        expect(wrappers).toEqual(expectedWrappers);
      });
    });
  });
});
