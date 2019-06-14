import { ComponentDoc } from 'react-docgen-typescript/lib';
import { parseComponentName } from '../parseComponentName';

describe('parseComponentName', () => {
  const componentPath:string = 'path/to/ComponentName.jsx';

  describe('when parsed doc displaName is empty', () => {
    let parsed:ComponentDoc;
    let componentName:string;

    beforeAll(() => {
      parsed = {
        description: '',
        displayName: '',
        props: {},
      };

      componentName = parseComponentName(componentPath, parsed);
    });

    it('returns component name from path', () => {
      expect(componentName).toEqual('ComponentName');
    });
  });

  describe('when parsed doc displayName is not empty', () => {
    let parsed:ComponentDoc;
    let componentName:string;

    beforeAll(() => {
      parsed = {
        description: '',
        displayName: 'CustomComponentName',
        props: {},
      };

      componentName = parseComponentName(componentPath, parsed);
    });

    it('returns component name from component doc displayName', () => {
      expect(componentName).toEqual('CustomComponentName');
    });
  });
});
