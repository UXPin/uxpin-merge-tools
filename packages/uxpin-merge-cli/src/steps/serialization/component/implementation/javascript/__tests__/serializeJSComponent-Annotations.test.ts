import { ComponentImplementationInfo } from '../../../../../discovery/component/ComponentInfo';
import { ComponentMetadata } from '../../../ComponentDefinition';
import { BuiltInWrappers, ComponentWrapperType } from '../../../wrappers/ComponentWrapper';
import { ImplSerializationResult } from '../../ImplSerializationResult';
import { serializeJSComponent } from '../serializeJSComponent';
import { getImplementation } from './utils/getImplementation';

describe('SerializeJSComponent - with annotations', () => {
  describe('function with component declaration', () => {
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

  describe('default exported functional component composed with HOC and comment', () => {
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

  describe('function with namespace declaration', () => {
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

  describe('multiple functions without annotation', () => {
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

  describe('function with namespace and wrappers declaration', () => {
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

  describe('class with bind annotation', () => {
    it('serializes correctly including bind declaration in both function and bound property', () => {
      // given
      const component:ComponentImplementationInfo = getImplementation('ClassWithBindAnnotation');

      // when
      return serializeJSComponent(component).then((serializedProps) => {
        // then
        const expectedMetadata:ComponentMetadata = {
          name: 'ClassWithBindAnnotation',
          properties: [
            {
              defaultValue: { value: false },
              description: '',
              isAutoUpdated: true,
              isRequired: false,
              name: 'isChecked',
              type: { name: 'boolean', structure: {} },
            },
            {
              description: '',
              isRequired: true,
              name: 'label',
              type: { name: 'string', structure: {} },
            },
            {
              defaultValue: { value: '' },
              description: '',
              isRequired: false,
              name: 'name',
              type: { name: 'string', structure: {} },
            },
            {
              autoUpdate: {
                targetPropName: 'isChecked',
                valuePath: '0.target.checked',
              },
              description: '',
              isRequired: false,
              name: 'onChange',
              type: { name: 'func', structure: {} },
            },
          ],
          wrappers: [],
        };

        expect(serializedProps.result).toEqual(expectedMetadata);
        expect(serializedProps.warnings).toEqual([]);
      });
    });
  });

  describe('class with broken bind annotation', () => {
    it('rejects with an error message', async () => {
      // given
      const component:ComponentImplementationInfo = getImplementation('ClassWithBindAnnotation');

      // when
      await expect(serializeJSComponent(component)).rejects.toEqual(
`Incorrect property name pointed as a binding source.
  Expected syntax: @uxpinbind [source property name] [value path - optional].
  Examples:
    @uxpinbind onChange 0.target.checked
    @uxpinbind onSelect`);
    });
  });

  describe('class with a binding annotation to nonexistent property', async () => {
    // given
    const component:ComponentImplementationInfo = getImplementation('ClassWithBindAnnotationToNonexistentProp');

    // when
    await expect(serializeJSComponent(component)).rejects.toEqual(`Incorrect property name pointed as a binding source.
    No such property: "onChanged"`);
  });

  describe('class with overlapping bind annotations', async () => {
    // given
    const component:ComponentImplementationInfo = getImplementation('ClassWithOverlappingBindAnnotations');

    // when
    // tslint:disable-next-line:max-line-length
    await expect(serializeJSComponent(component)).rejects.toEqual(`More than one property is trying to bind the same source property "onChange"`);
  });
});
