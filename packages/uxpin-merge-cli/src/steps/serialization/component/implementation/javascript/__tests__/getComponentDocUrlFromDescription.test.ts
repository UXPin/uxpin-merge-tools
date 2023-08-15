import { getJSDocTagsArrayFromString } from '../../../comments/getJSDocTagsArrayFromString';
import { getComponentDocUrlFromJsDocTags } from '../jsdoc-uxpin-annotations';

describe('getComponentDocUrlFromJsDocTags', () => {
  describe('when description is empty', () => {
    const description = getJSDocTagsArrayFromString('');
    it('returns undefined', () => {
      expect(getComponentDocUrlFromJsDocTags(description)).toBeUndefined();
    });
  });

  describe('when description does not contain @uxpindocurl annotation', () => {
    const descriptionNoAnnotation = getJSDocTagsArrayFromString('Description string without annotation');

    it('returns undefined', () => {
      expect(getComponentDocUrlFromJsDocTags(descriptionNoAnnotation)).toBeUndefined();
    });
  });

  describe('when description contains single-line @uxpindocurl annotation', () => {
    const descriptionSingleLine = getJSDocTagsArrayFromString('@uxpindocurl https://app.uxpin.com/test');

    it('returns docUrl url', () => {
      expect(getComponentDocUrlFromJsDocTags(descriptionSingleLine)).toMatch('https://app.uxpin.com/test');
    });

    describe('when description contains multi-line @uxpindocurl annotation', () => {
      const descriptionMultiLine = getJSDocTagsArrayFromString(`Some component description
     @uxpindocurl https://app.uxpin.com/test
     Another description line`);

      it('returns extracted docUrl url', () => {
        expect(getComponentDocUrlFromJsDocTags(descriptionMultiLine)).toMatch('https://app.uxpin.com/test');
      });
    });
  });
});
