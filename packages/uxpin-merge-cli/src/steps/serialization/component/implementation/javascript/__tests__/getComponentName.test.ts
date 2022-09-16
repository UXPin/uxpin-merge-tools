import { ComponentDoc } from 'react-docgen-typescript/lib';
import { getComponentName } from '../getComponentName';

describe('parseComponentName', () => {
  const componentPath = 'path/to/ComponentName.jsx';

  describe('when parsed doc displaName is empty', () => {
    let parsed: ComponentDoc;
    let componentName: string;

    beforeAll(() => {
      parsed = {
        description: '',
        displayName: '',
        props: {},
      };

      componentName = getComponentName(componentPath, parsed);
    });

    it('returns component name from path', () => {
      expect(componentName).toEqual('ComponentName');
    });
  });

  describe('when parsed doc displayName is not empty', () => {
    let parsed: ComponentDoc;
    let componentName: string;

    beforeAll(() => {
      parsed = {
        description: '',
        displayName: 'CustomComponentName',
        props: {},
      };

      componentName = getComponentName(componentPath, parsed);
    });

    it('returns component name from component doc displayName', () => {
      expect(componentName).toEqual('CustomComponentName');
    });
  });
});
