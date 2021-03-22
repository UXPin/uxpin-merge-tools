import { ComponentMetadata } from '../../ComponentDefinition';
import { getComponentNamespacedName } from '../getComponentNamespacedName';

describe('getComponentNamespacedName', () => {
  it('should get valid name for component without namespace', () => {
    // having
    const metadata:ComponentMetadata = {
      defaultExported: true,
      name: 'Button',
      properties: [],
    };

    // when
    // then
    expect(getComponentNamespacedName(metadata)).toBe('Button');
  });

  it('should get valid name for component with namespace', () => {
    // having
    const metadata:ComponentMetadata = {
      defaultExported: true,
      name: 'Button',
      namespace: {
        importSlug: 'Card_Header_Button',
        name: 'Card.Header',
      },
      properties: [],
    };

    // when
    // then
    expect(getComponentNamespacedName(metadata)).toBe('Card.Header.Button');
  });
});
