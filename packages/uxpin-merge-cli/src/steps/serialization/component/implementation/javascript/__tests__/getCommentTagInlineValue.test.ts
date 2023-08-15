import { getCommentTagInlineValue } from '../jsdoc-uxpin-annotations';

describe('getCommentTagInlineValue', () => {
  const tag = '@uxpintag';

  describe('when comment is empty', () => {
    const comment = '';

    it('returns undefined', () => {
      expect(getCommentTagInlineValue(comment, tag)).toBeUndefined();
    });
  });

  describe('when comment doesnt contain given tag', () => {
    const comment = 'Some comment without tags';

    it('returns undefined', () => {
      expect(getCommentTagInlineValue(comment, tag)).toBeUndefined();
    });
  });

  describe('when comment contains given tag with simple value', () => {
    const comment = '@uxpintag tagvalue ';

    it('returns tag value', () => {
      expect(getCommentTagInlineValue(comment, tag)).toEqual('tagvalue');
    });
  });

  describe('when comment contains given tag with complex value', () => {
    const comment = '@uxpintag tag.value_foo-baz ';

    it('returns tag value', () => {
      expect(getCommentTagInlineValue(comment, tag)).toEqual('tag.value_foo-baz');
    });
  });

  describe('when comment contains #', () => {
    const comment = '@uxpintag https://mui.com/components/buttons/#main-content';

    it('returns tag value', () => {
      expect(getCommentTagInlineValue(comment, tag)).toEqual('https://mui.com/components/buttons/#main-content');
    });
  });

  describe('when comment contains given tag with multi-word value', () => {
    const comment = '@uxpintag Some multi word text';

    it('returns undefined', () => {
      expect(getCommentTagInlineValue(comment, tag)).toBeUndefined();
    });
  });

  describe('when comment contains given tag and following text lines', () => {
    const comment = `Component description
      @uxpintag tag.value_foo-baz
      @param some param description
    `;

    it('returns tag value', () => {
      expect(getCommentTagInlineValue(comment, tag)).toEqual('tag.value_foo-baz');
    });
  });
});
