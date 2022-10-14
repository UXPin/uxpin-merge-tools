import { getPropertyDescription } from '../getPropertyDescription';

describe('getPropertyDescription', () => {
  describe('without custom descriptors', () => {
    it('should return empty string when not provided', () => {
      // having
      const desc = '';

      // when
      // then
      expect(getPropertyDescription(desc)).toEqual('');
    });

    it('should trim description', () => {
      // having
      const desc = '     Some description    ';

      // when
      // then
      expect(getPropertyDescription(desc)).toEqual('Some description');
    });

    it('should work well with multiline description', () => {
      // having
      // tslint:disable:no-trailing-whitespace
      const desc = `   Some
   multiline
description    

with empty

lines.`;
      // tslint:enable:no-trailing-whitespace

      // when
      // then
      expect(getPropertyDescription(desc)).toEqual(`Some
multiline
description

with empty

lines.`);
    });
  });

  describe('with custom descriptors', () => {
    it('should return empty string if only descriptors are provided', () => {
      // having
      const desc = `@uxpinfoo test
@uxpinfoo test2`;

      // when
      // then
      expect(getPropertyDescription(desc)).toEqual('');
    });

    it('should return description provided before descriptors', () => {
      // having
      const desc = `Some description

@uxpinfoo test
@uxpinfoo test2`;

      // when
      // then
      expect(getPropertyDescription(desc)).toEqual('Some description');
    });

    it('should work well with multilines descriptions', () => {
      // having
      const desc = `Some
multiline
description

with empty
lines.






@uxpinfoo bar
@uxpinfoo baz`;

      // when
      // then
      expect(getPropertyDescription(desc)).toEqual(`Some
multiline
description

with empty
lines.`);
    });
  });

  describe('with external JSDoc tags', () => {
    it('should keep external JSDoc tags', () => {
      // having
      const desc = `Some description

@uxpindescription Multiline
UXPin
description
@ignore
@private
@uxpinpropname User friendly name`;

      // when
      // then
      expect(getPropertyDescription(desc)).toEqual(`Some description

@ignore
@private`);
    });
  });
});
