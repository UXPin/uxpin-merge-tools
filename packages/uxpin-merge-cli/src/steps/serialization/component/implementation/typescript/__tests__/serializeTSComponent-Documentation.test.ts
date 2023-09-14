import { Warned } from '../../../../../../common/warning/Warned';
import { ComponentImplementationInfo } from '../../../../../discovery/component/ComponentInfo';
import { ComponentMetadata } from '../../../ComponentDefinition';
import { serializeTSComponent } from '../serializeTSComponent';
import { getImplementation } from './utils/getImplementation';

describe('serializeTSComponent-DocUrl', () => {
  describe('functional component', () => {
    it('is serialized correctly with the provided description', async () => {
      // having
      const component: ComponentImplementationInfo = getImplementation('FunctionWithDocumentationDeclaration');
      const expectedMetadata: ComponentMetadata = {
        componentDescription: '123 456 abc efg',
        defaultExported: true,
        name: 'FunctionWithDocumentationDeclaration',
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

    it('is serialized correctly with the provided documentation and forwardRef()', async () => {
      // having
      const component: ComponentImplementationInfo = getImplementation(
        'NamedExportedComponentWithForwardRefAndDocumentationDeclaration'
      );
      const expectedMetadata: ComponentMetadata = {
        componentDescription: 'test test',
        defaultExported: false,
        name: 'NamedExportedComponentWithForwardRefAndDocumentationDeclaration',
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
