import { ImplSerializationResult } from '../../ImplSerializationResult';
import { serializeJSComponent } from '../serializeJSComponent';
import { ComponentImplementationInfo } from './../../../../../discovery/component/ComponentInfo';
import { getImplementation } from './serializeJSComponent.test';

describe('SerializeJSComponent - with annotations', () => {
  describe('FunctionWithNamespaceDeclaration', () => {
    let serialized:ImplSerializationResult;

    beforeAll(async () => {
      const component:ComponentImplementationInfo = getImplementation('FunctionWithNamespaceDeclaration');
      serialized = await serializeJSComponent(component);
    });

    it('returns correct component name', () => {
      expect(serialized.result.name).toEqual('FunctionWithNamespaceDeclaration');
    });

    it('returns annotated namespace value', () => {
      expect(serialized.result.namespace!.name).toEqual('CustomNamespace');
    });

    it('returns correct props list of component', () => {
      expect(serialized.result.properties).toEqual([
        expect.objectContaining({
          isRequired: true,
          name: 'name',
        }),
      ]);
    });

    it('returns empty warnings list', () => {
      expect(serialized.warnings).toEqual([]);
    });
  });
});
