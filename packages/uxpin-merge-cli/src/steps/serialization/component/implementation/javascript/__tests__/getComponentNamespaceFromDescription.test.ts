import { getJSDocTagsArrayFromString } from '../../../comments/getJSDocTagsArrayFromString';
import { getComponentNamespaceFromJsDocTags } from '../jsdoc-uxpin-annotations';

describe('getComponentNamespaceFromDescription', () => {
  const componentName = 'ComponentName';

  describe('when description is empty', () => {
    const description = getJSDocTagsArrayFromString('');

    it('returns undefined', () => {
      expect(getComponentNamespaceFromJsDocTags(componentName, description)).toBeUndefined();
    });
  });

  describe('when description does not contain @uxpinnamespace annotation', () => {
    const description = getJSDocTagsArrayFromString('Description string without annotation');

    it('returns undefined', () => {
      expect(getComponentNamespaceFromJsDocTags(componentName, description)).toBeUndefined();
    });
  });

  describe('when description contains single-line @uxpinnamespace annotation', () => {
    const description = getJSDocTagsArrayFromString('@uxpinnamespace CustomNamespace');

    it('returns namespace name', () => {
      expect(getComponentNamespaceFromJsDocTags(componentName, description)).toMatchObject({
        name: 'CustomNamespace',
      });
    });
  });

  describe('when description contains single-line, multi-level @uxpinnamespace annotation', () => {
    const description = getJSDocTagsArrayFromString('@uxpinnamespace Level1.level2.CustomNamespace');

    it('returns multi-level namespace name', () => {
      expect(getComponentNamespaceFromJsDocTags(componentName, description)).toMatchObject({
        name: 'Level1.level2.CustomNamespace',
      });
    });
  });

  describe('when description contains multi-line @uxpinnamespace annotation', () => {
    const description = getJSDocTagsArrayFromString(`Some component description

@uxpinnamespace CustomNamespace
Another description line`);

    it('returns extracted namespace name', () => {
      expect(getComponentNamespaceFromJsDocTags(componentName, description)).toMatchObject({
        name: 'CustomNamespace',
      });
    });
  });
});
