import { ComponentImplementationInfo } from '../../../../../discovery/component/ComponentInfo';
import { BuiltInWrappers, ComponentWrapperType } from '../../../wrappers/ComponentWrapper';
import { ImplSerializationResult } from '../../ImplSerializationResult';
import { serializeJSComponent } from '../serializeJSComponent';
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

    it('returns empty list of wrappers', () => {
      expect(serialized.result.wrappers).toEqual([]);
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

  describe('DefaultExportedFunctionalComponentComposedWithHOCAndComment', () => {
    let serialized:ImplSerializationResult;

    beforeAll(async () => {
      const component:ComponentImplementationInfo =
        getImplementation('DefaultExportedFunctionalComponentComposedWithHOCAndComment');

      serialized = await serializeJSComponent(component);
    });

    it('returns name of annotated component', () => {
      expect(serialized.result.name).toEqual('ClassPrependedWithCommentToBeComposedWithHOC');
    });

    it('returns namespace value of annotated component', () => {
      expect(serialized.result.namespace!.name).toEqual('Multi.Level.CustomNamespace');
    });

    it('returns empty list of wrappers', () => {
      expect(serialized.result.wrappers).toEqual([]);
    });

    it('returns props of annotated component', () => {
      expect(serialized.result.properties).toEqual([
        expect.objectContaining({
          name: 'appearance',
        }),
        expect.objectContaining({
          name: 'children',
        }),
        expect.objectContaining({
          name: 'i18n',
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

    it('returns empty list of wrappers', () => {
      expect(serialized.result.wrappers).toEqual([]);
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

  describe('MultipleFunctionsWithoutAnnotation', () => {
    let component:ComponentImplementationInfo;

    beforeAll(() => {
      component = getImplementation('MultipleFunctionsWithoutAnnotation');
    });

    it('throws "Multiple exported component definitions" error', async () => {
      expect.assertions(1);
      let error:Error = new Error('Error not thrown');

      try {
        await serializeJSComponent(component);
      } catch (e) {
        error = e; // standard .toThrow() assertion doesnt work in this case :dunno:
      }

      expect(error.message).toMatch('Multiple exported component definitions found.');
    });
  });

  describe('FunctionWithNamespaceAndWrappersDeclaration', () => {
    let serialized:ImplSerializationResult;

    beforeAll(async () => {
      const component:ComponentImplementationInfo = getImplementation('FunctionWithNamespaceAndWrappersDeclaration');
      serialized = await serializeJSComponent(component);
    });

    it('returns correct component name', () => {
      expect(serialized.result.name).toEqual('FunctionWithNamespaceAndWrappersDeclaration');
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

    it('returns proper list of wrappers', () => {
      expect(serialized.result.wrappers).toEqual([
        {
          name: BuiltInWrappers.NON_RESIZABLE_WRAPPER,
          type: ComponentWrapperType.BUILT_IN,
        },
      ]);
    });

    it('returns empty warnings list', () => {
      expect(serialized.warnings).toEqual([]);
    });
  });
});
