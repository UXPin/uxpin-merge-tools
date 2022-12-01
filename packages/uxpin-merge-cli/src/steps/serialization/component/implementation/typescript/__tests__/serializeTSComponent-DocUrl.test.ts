import { Warned } from '../../../../../../common/warning/Warned';
import { ComponentImplementationInfo } from '../../../../../discovery/component/ComponentInfo';
import { ComponentMetadata } from '../../../ComponentDefinition';
import { serializeTSComponent } from '../serializeTSComponent';
import { getImplementation } from './serializeTSComponent.test';

describe('serializeTSComponent-DocUrl', () => {
  describe('functional component', () => {
    it('is serialized correctly with the provided url', async () => {
      // having
      const component: ComponentImplementationInfo = getImplementation('FunctionWithDocUrlDeclaration');
      const expectedMetadata: ComponentMetadata = {
        componentDocUrl: 'https://app.uxpin.com/test',
        defaultExported: true,
        name: 'FunctionWithDocUrlDeclaration',
        properties: [
          {
            description: '',
            isRequired: true,
            name: 'name',
            type: { name: 'string', structure: {} },
          },
        ],
        wrappers: [],
      };

      // when
      const metadata: Warned<ComponentMetadata> = await serializeTSComponent(component);
      // then
      expect(metadata.warnings).toEqual([]);
      expect(metadata.result).toEqual(expectedMetadata);
    });

    it('is serialized correctly with the provided url and forwardRef()', async () => {
      // having
      const component: ComponentImplementationInfo = getImplementation(
        'NamedExportedComponentWithForwardRefAndDocUrlDeclaration'
      );
      const expectedMetadata: ComponentMetadata = {
        componentDocUrl: 'https://app.uxpin.com/test',
        defaultExported: false,
        name: 'NamedExportedComponentWithForwardRefAndDocUrlDeclaration',
        namespace: undefined,
        properties: [
          {
            description: '',
            isRequired: true,
            name: 'size',
            type: { name: 'string', structure: {} },
          },
          {
            description: '',
            isRequired: true,
            name: 'imageUrl',
            type: { name: 'string', structure: {} },
          },
        ],
        wrappers: [],
      };

      // when
      const metadata: Warned<ComponentMetadata> = await serializeTSComponent(component);
      // then
      expect(metadata.warnings).toEqual([]);
      expect(metadata.result).toEqual(expectedMetadata);
    });
  });
});
