import { ImplSerializationResult } from '../../ImplSerializationResult';
import { serializeJSComponent } from '../serializeJSComponent';
import { ComponentImplementationInfo } from './../../../../../discovery/component/ComponentInfo';
import { getImplementation } from './utils/getImplementation';

describe('SerializeJSComponent - with annotations', () => {
  describe('FunctionWithComponentDeclaration', () => {
    let serialized:ImplSerializationResult;

    beforeAll(async () => {
      const component:ComponentImplementationInfo = getImplementation('FunctionWithComponentDeclaration');
      serialized = await serializeJSComponent(component);
    });

    it('returns name of annotated component', () => {
      expect(serialized.result.name).toEqual('FunctionWithComponentDeclarationAndCustomName');
    });

    it('doesnt return namespace value', () => {
      expect(serialized.result.namespace).toBeUndefined();
    });

    it('returns props of annotated component', () => {
      expect(serialized.result.properties).toEqual([
        expect.objectContaining({
          name: 'children',
        }),
        expect.objectContaining({
          name: 'id',
        }),
        expect.objectContaining({
          name: 'appearance',
        }),
        expect.objectContaining({
          name: 'modifier',
        }),
        expect.objectContaining({
          defaultValue: {
            value: false,
          },
          isRequired: false,
          name: 'hidden',
        }),
      ]);
    });

    it('returns empty warnings list', () => {
      expect(serialized.warnings).toEqual([]);
    });
  });

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
