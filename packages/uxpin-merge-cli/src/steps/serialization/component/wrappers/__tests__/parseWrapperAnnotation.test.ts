import { ComponentWrapper, ComponentWrapperType } from '../ComponentWrapper';
import { parseWrapperAnnotation } from '../parseWrapperAnnotation';

describe('parseWrapperAnnotation', () => {
  describe('when empty tag is provided', () => {
    it('should return undefined', () => {
      // having
      const tag:string = '';

      // when
      const wrappers:ComponentWrapper[] | undefined = parseWrapperAnnotation(tag);

      // then
      expect(wrappers).toEqual(undefined);
    });
  });

  describe('when invalid tag is provided', () => {
    it('should return undefined', () => {
      // having
      const tag:string = '@uxpincomponent';

      // when
      const wrappers:ComponentWrapper[] | undefined = parseWrapperAnnotation(tag);

      // then
      expect(wrappers).toEqual(undefined);
    });
  });

  describe('when tag with single wrapper is provided', () => {
    describe('and it is a built in wrapper', () => {
      it('should return array with this wrapper', () => {
        // having
        const tag:string = '@uxpinwrappers NonResizableWrapper';
        const expectedWrappers:ComponentWrapper[] | undefined = [{
          name: 'NonResizableWrapper',
          type: ComponentWrapperType.BUILT_IN,
        }];

        // when
        const wrappers:ComponentWrapper[] | undefined = parseWrapperAnnotation(tag);

        // then
        expect(wrappers).toEqual(expectedWrappers);
      });
    });

    describe('and it is a custom wrapper', () => {
      it('should return array with this wrapper', () => {
        // having
        const tag:string = '@uxpinwrappers ./path/to/customWrapper';
        const expectedWrappers:ComponentWrapper[] | undefined = [{
          name: 'customWrapper',
          path: './path/to/customWrapper',
          type: ComponentWrapperType.CUSTOM,
        }];

        // when
        const wrappers:ComponentWrapper[] | undefined = parseWrapperAnnotation(tag);

        // then
        expect(wrappers).toEqual(expectedWrappers);
      });
    });
  });

  describe('when multiple wrappers are passed', () => {
    describe('in a single line comment', () => {
      it('should return array of wrappers', () => {
        // having
        const tag:string = '@uxpinwrappers ./path/to/customWrapper,NonResizableWrapper';
        const expectedWrappers:ComponentWrapper[] | undefined = [
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
        const wrappers:ComponentWrapper[] | undefined = parseWrapperAnnotation(tag);

        // then
        expect(wrappers).toEqual(expectedWrappers);
      });
    });

    describe('in a multi line comment', () => {
      it('should return array of wrappers', () => {
        // having
        const tag:string = `@uxpinwrappers
./path/to/customWrapper,
NonResizableWrapper`;
        const expectedWrappers:ComponentWrapper[] | undefined = [
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
        const wrappers:ComponentWrapper[] | undefined = parseWrapperAnnotation(tag);

        // then
        expect(wrappers).toEqual(expectedWrappers);
      });
    });
  });
});
