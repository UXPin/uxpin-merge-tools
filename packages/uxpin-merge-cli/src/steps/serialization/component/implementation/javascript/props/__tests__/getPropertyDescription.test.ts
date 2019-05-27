import { getPropertyDescription } from '../getPropertyDescription';

describe('getPropertyDescription', () => {
  describe('without custom descriptors', () => {
    it('should return empty string when not provided', () => {
      // having
      const desc:string = '';

      // when
      // then
      expect(getPropertyDescription(desc)).toEqual('');
    });

    it('should trim description', () => {
      // having
      const desc:string = '     Some description    ';

      // when
      // then
      expect(getPropertyDescription(desc)).toEqual('Some description');
    });

    it('should work well with multiline description', () => {
      // having
      // tslint:disable:no-trailing-whitespace
      const desc:string = `   Some
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
      const desc:string = `@foo test
@bar test2`;

      // when
      // then
      expect(getPropertyDescription(desc)).toEqual('');
    });

    it('should return description provided before descriptors', () => {
      // having
      const desc:string = `Some description

@foo test
@bar test2`;

      // when
      // then
      expect(getPropertyDescription(desc)).toEqual('Some description');
    });

    it('should work well with multilines descriptions', () => {
      // having
      const desc:string = `Some
multiline
description

with empty
lines.






@foo bar
@bar baz`;

      // when
      // then
      expect(getPropertyDescription(desc)).toEqual(`Some
multiline
description

with empty
lines.`);
    });
  });
});
