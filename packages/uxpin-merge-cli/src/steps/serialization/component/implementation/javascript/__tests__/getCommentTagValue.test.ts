import { getCommentTagValue } from '../getCommentTagValue';

describe('getCommentTagValue', () => {
  const tag:string = '@uxpintag';

  describe('when comment is empty', () => {
    const comment:string = '';

    it('returns undefined', () => {
      expect(getCommentTagValue(comment, tag)).toBeUndefined();
    });
  });

  describe('when comment doesnt contain given tag', () => {
    const comment:string = 'Some comment without tags';

    it('returns undefined', () => {
      expect(getCommentTagValue(comment, tag)).toBeUndefined();
    });
  });

  describe('when comment contains given tag with simple value', () => {
    const comment:string = '@uxpintag tagvalue ';

    it('returns tag value', () => {
      expect(getCommentTagValue(comment, tag)).toEqual('tagvalue');
    });
  });

  describe('when comment contains given tag with complex value', () => {
    const comment:string = '@uxpintag tag.value_foo-baz ';

    it('returns tag value', () => {
      expect(getCommentTagValue(comment, tag)).toEqual('tag.value_foo-baz');
    });
  });

  describe('when comment contains given tag with multi-word value', () => {
    const comment:string = '@uxpintag Some multi word text';

    it('returns undefined', () => {
      expect(getCommentTagValue(comment, tag)).toBeUndefined();
    });
  });

  describe('when comment contains given tag and following text lines', () => {
    const comment:string = `Component description
      @uxpintag tag.value_foo-baz
      @param some param description
    `;

    it('returns tag value', () => {
      expect(getCommentTagValue(comment, tag)).toEqual('tag.value_foo-baz');
    });
  });
});
