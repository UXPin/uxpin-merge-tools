import { getJSDocTagsArrayFromString } from "../getJSDocTagsArrayFromString";

describe('getJSDocTagsArrayFromString', () => {
  describe('when multiline string with multiline tags is provided', () => {
    it('should parse the tags correctly', () => {
      // having
      const value:string = `

@tag1 value
@tag2 multiline
value
@tag3 multiline    
value   with
whitespaces




@tag4    `;

      // when
      // then
      expect(getJSDocTagsArrayFromString(value)).toEqual([
        '@tag1 value',
        '@tag2 multiline\nvalue',
        '@tag3 multiline\nvalue   with\nwhitespaces',
        '@tag4',
      ]);
    });
  })
});
