import { Warned } from '../../../../../../common/warning/Warned';
import { ComponentImplementationInfo } from '../../../../../discovery/component/ComponentInfo';
import { ComponentMetadata } from '../../../ComponentDefinition';
import { getImplementation } from './serializeTSComponent.test';
import { serializeTSComponent } from '../serializeTSComponent';

describe('serializeTSComponent-Namespaces', () => {
  describe('class component', () => {
    it('is serialized correctly with provided namespace', async () => {
      // having
      const component:ComponentImplementationInfo = getImplementation('ClassWithNamespaceDeclaration');
      const expectedMetadata:ComponentMetadata = {
        name: 'ClassWithNamespaceDeclaration',
        namespace: {
          importSlug: 'Namespace_ClassWithNamespaceDeclaration',
          name: 'Namespace',
        },
        properties: [
          {
            description: '',
            isRequired: true,
            name: 'name',
            type: { name: 'string', structure: {} },
          },
        ],
      };

      // when
      const metadata:Warned<ComponentMetadata> = await serializeTSComponent(component);

      // then
      expect(metadata.warnings).toEqual([]);
      expect(metadata.result).toEqual(expectedMetadata);
    });

    it('is serialized correctly with multilevel namespace', async () => {
      // having
      const component: ComponentImplementationInfo = getImplementation('ClassWithMultilevelNamespaceDeclaration');
      const expectedMetadata:ComponentMetadata = {
        name: 'ClassWithMultilevelNamespaceDeclaration',
        namespace: {
          importSlug: 'Some_Nested_Namespace_ClassWithMultilevelNamespaceDeclaration',
          name: 'Some.Nested.Namespace',
        },
        properties: [
          {
            description: '',
            isRequired: true,
            name: 'name',
            type: { name: 'string', structure: {} },
          },
        ],
      };

      // when
      const metadata:Warned<ComponentMetadata> = await serializeTSComponent(component);

      // then
      expect(metadata.warnings).toEqual([]);
      expect(metadata.result).toEqual(expectedMetadata);
    });
  });

  describe('functional component', () => {
    it('is serialized correctly with provided namespace', async () => {
      // having
      const component:ComponentImplementationInfo = getImplementation('FunctionWithNamespaceDeclaration');
      const expectedMetadata:ComponentMetadata = {
        name: 'FunctionWithNamespaceDeclaration',
        namespace: {
          importSlug: 'Namespace_FunctionWithNamespaceDeclaration',
          name: 'Namespace',
        },
        properties: [
          {
            description: '',
            isRequired: true,
            name: 'name',
            type: { name: 'string', structure: {} },
          },
        ],
      };

      // when
      const metadata:Warned<ComponentMetadata> = await serializeTSComponent(component);

      // then
      expect(metadata.warnings).toEqual([]);
      expect(metadata.result).toEqual(expectedMetadata);
    });

    it('is serialized correctly with multilevel namespace', async () => {
      // having
      const component: ComponentImplementationInfo = getImplementation('FunctionWithMultilevelNamespaceDeclaration');
      const expectedMetadata:ComponentMetadata = {
        name: 'FunctionWithMultilevelNamespaceDeclaration',
        namespace: {
          importSlug: 'Some_Nested_Namespace_FunctionWithMultilevelNamespaceDeclaration',
          name: 'Some.Nested.Namespace',
        },
        properties: [
          {
            description: '',
            isRequired: true,
            name: 'name',
            type: { name: 'string', structure: {} },
          },
        ],
      };

      // when
      const metadata:Warned<ComponentMetadata> = await serializeTSComponent(component);

      // then
      expect(metadata.warnings).toEqual([]);
      expect(metadata.result).toEqual(expectedMetadata);
    });
  });
});
