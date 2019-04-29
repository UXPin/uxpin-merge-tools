import { getTypeScriptComponentPath } from '../../../../../../../test/utils/resources/getExampleComponentPath';
import { Warned } from '../../../../../../common/warning/Warned';
import { ComponentImplementationInfo } from '../../../../../discovery/component/ComponentInfo';
import { ComponentMetadata } from '../../../ComponentDefinition';
import { serializeTSComponent } from '../serializeTSComponent';

describe('serializeTSComponent', () => {
  describe('providing array of objects describing all properties of the TypeScript component', () => {
    it('serializes functional component with primitive property types', () => {
      // given
      const component:ComponentImplementationInfo = getImplementation('FunctionPrimitivesOnly');
      const expectedProps:ComponentMetadata = {
        name: 'FunctionPrimitivesOnly',
        properties: [
          {
            description: '',
            isRequired: false,
            name: 'children',
            type: { name: 'string', structure: {} },
          },
          {
            description: '',
            isRequired: true,
            name: 'id',
            type: { name: 'string', structure: {} },
          },
          {
            description: '',
            isRequired: false,
            name: 'action',
            type: { name: 'number', structure: {} },
          },
          {
            description: '',
            isRequired: false,
            name: 'hidden',
            type: { name: 'boolean', structure: {} },
          },
        ],
      };

      // when
      return serializeTSComponent(component).then((serializedProps) => {
        // then
        expect(serializedProps.result).toEqual(expectedProps);
        expect(serializedProps.warnings).toEqual([]);
      });
    });

    it('serializes class component with enum property types', () => {
      // given
      const component:ComponentImplementationInfo = getImplementation('ClassEnumTypes');
      const expectedProps:ComponentMetadata = {
        name: 'ClassEnumTypes',
        properties: [
          {
            description: 'String only',
            isRequired: false,
            name: 'children',
            type: { name: 'string', structure: {} },
          },
          {
            description: '',
            isRequired: true,
            name: 'appearance',
            type: {
              name: 'union',
              structure: {
                elements: expect.arrayContaining([
                  { name: 'literal', structure: { value: 'secondary' } },
                  { name: 'literal', structure: { value: 'primary' } },
                  { name: 'literal', structure: { value: 'link' } },
                ]),
              },
            },
          },
          {
            description: '',
            isRequired: false,
            name: 'size',
            type: {
              name: 'union',
              structure: {
                elements: expect.arrayContaining([
                  { name: 'literal', structure: { value: 'large' } },
                  { name: 'literal', structure: { value: 'medium' } },
                  { name: 'literal', structure: { value: 'small' } },
                ]),
              },
            },
          },
        ],
      };

      // when
      return serializeTSComponent(component).then((serializedProps) => {
        // then
        expect(serializedProps.result).toEqual(expectedProps);
        expect(serializedProps.warnings).toEqual([]);
      });
    });

    it('serializes class component with default property values', () => {
      // given
      const component:ComponentImplementationInfo = getImplementation('ClassWithDefaults');
      const expectedProps:ComponentMetadata = {
        name: 'ClassWithDefaults',
        properties: [
          {
            defaultValue: { value: 'Submit' },
            description: '',
            isRequired: false,
            name: 'value',
            type: { name: 'string', structure: {} },
          },
          {
            defaultValue: { value: 'secondary' },
            description: '',
            isRequired: true,
            name: 'appearance',
            type: {
              name: 'union',
              structure: {
                elements: expect.arrayContaining([
                  { name: 'literal', structure: { value: 'secondary' } },
                  { name: 'literal', structure: { value: 'primary' } },
                  { name: 'literal', structure: { value: 'link' } },
                ]),
              },
            },
          },
          {
            defaultValue: { value: 1223 },
            description: 'Default value from JSDoc comment is overridden by value from `defaultProps`',
            isRequired: true,
            name: 'width',
            type: { name: 'number', structure: {} },
          },
          {
            defaultValue: { value: 233 },
            description: 'Number default value from JSDoc',
            isRequired: true,
            name: 'height',
            type: { name: 'number', structure: {} },
          },
          {
            defaultValue: { value: true },
            description: '',
            isRequired: true,
            name: 'isOpen',
            type: { name: 'boolean', structure: {} },
          },
          {
            defaultValue: { value: { name: 'Untitled' } },
            description: 'Object JSDoc default value',
            isRequired: false,
            name: 'item',
            type: { name: 'shape', structure: {} },
          },
          {
            defaultValue: { value: false },
            description: '',
            isRequired: true,
            name: 'isDisabled',
            type: { name: 'boolean', structure: {} },
          },
          {
            defaultValue: { value: 'JSDoc default value' },
            description: '',
            isRequired: true,
            name: 'otherValue',
            type: { name: 'string', structure: {} },
          },
          {
            defaultValue: { value: 'JSDoc default value double quoted' },
            description: '',
            isRequired: true,
            name: 'yetAnotherValue',
            type: { name: 'string', structure: {} },
          },
        ],
      };

      // when
      return serializeTSComponent(component).then((serializedProps) => {
        // then
        expect(serializedProps.result).toEqual(expectedProps);
        expect(serializedProps.warnings).toEqual([]);
      });
    });

    it('serializes component with interface property type', () => {
      // given
      const component:ComponentImplementationInfo = getImplementation('ClassInterfaceTypes');
      const expectedProps:ComponentMetadata = {
        name: 'ClassInterfaceTypes',
        properties: [
          {
            description: '',
            isRequired: true,
            name: 'item',
            type: { name: 'shape', structure: {} },
          },
        ],
      };

      // when
      return serializeTSComponent(component).then((serializedProps) => {
        // then
        expect(serializedProps.result).toEqual(expectedProps);
        expect(serializedProps.warnings).toEqual([]);
      });
    });

    it('serializes component with imported interface property type', () => {
      // given
      const component:ComponentImplementationInfo = getImplementation('FunctionWithImportedTypes');
      const expectedProps:ComponentMetadata = {
        name: 'FunctionWithImportedTypes',
        properties: [
          {
            description: '',
            isRequired: false,
            name: 'children',
            type: { name: 'string', structure: {} },
          },
          {
            description: '',
            isRequired: true,
            name: 'item',
            type: { name: 'shape', structure: {} },
          },
        ],
      };

      // when
      return serializeTSComponent(component).then((serializedProps) => {
        // then
        expect(serializedProps.result).toEqual(expectedProps);
        expect(serializedProps.warnings).toEqual([]);
      });
    });

    it('serializes component with imported type of properties object', () => {
      // given
      const component:ComponentImplementationInfo = getImplementation('ClassWithImportedPropertiesType');
      const expectedProps:ComponentMetadata = {
        name: 'ClassWithImportedPropertiesType',
        properties: [
          {
            description: '',
            isRequired: true,
            name: 'name',
            type: { name: 'string', structure: {} },
          },
          {
            description: '',
            isRequired: true,
            name: 'value',
            type: { name: 'number', structure: {} },
          },
          {
            description: '',
            isRequired: true,
            name: 'nested',
            type: { name: 'shape', structure: {} },
          },
        ],
      };

      // when
      return serializeTSComponent(component).then((serializedProps) => {
        // then
        expect(serializedProps.result).toEqual(expectedProps);
        expect(serializedProps.warnings).toEqual([]);
      });
    });

    it('serializes component with function property types', () => {
      // given
      const component:ComponentImplementationInfo = getImplementation('ClassWithFunctionTypes');
      const expectedProps:ComponentMetadata = {
        name: 'ClassWithFunctionTypes',
        properties: [
          {
            description: '',
            isRequired: true,
            name: 'value',
            type: { name: 'string', structure: {} },
          },
          {
            description: 'Inline function type',
            isRequired: false,
            name: 'onClick',
            type: { name: 'func', structure: {} },
          },
          {
            description: 'Type alias reference',
            isRequired: false,
            name: 'onOpen',
            type: { name: 'func', structure: {} },
          },
          {
            description: 'Method signature',
            isRequired: true,
            name: 'onResize',
            type: { name: 'func', structure: {} },
          },
          {
            description: 'Optional method signature',
            isRequired: false,
            name: 'onMouseEnter',
            type: { name: 'func', structure: {} },
          },
        ],
      };

      // when
      return serializeTSComponent(component).then((serializedProps) => {
        // then
        expect(serializedProps.result).toEqual(expectedProps);
        expect(serializedProps.warnings).toEqual([]);
      });
    });

    it('serializes component with combined type of properties object', () => {
      // given
      const component:ComponentImplementationInfo = getImplementation('ClassWithCombinedPropertiesType');
      const expectedProps:ComponentMetadata = {
        name: 'ClassWithCombinedPropertiesType',
        properties: [
          {
            description: '',
            isRequired: true,
            name: 'name',
            type: { name: 'string', structure: {} },
          },
          {
            description: '',
            isRequired: true,
            name: 'value',
            type: { name: 'number', structure: {} },
          },
          {
            description: '',
            isRequired: true,
            name: 'nested',
            type: { name: 'shape', structure: {} },
          },
          {
            description: 'Local property',
            isRequired: true,
            name: 'id',
            type: { name: 'string', structure: {} },
          },
        ],
      };

      // when
      return serializeTSComponent(component).then((serializedProps) => {
        // then
        expect(serializedProps.result).toEqual(expectedProps);
        expect(serializedProps.warnings).toEqual([]);
      });
    });

    it('serializes component with extended type of properties object', () => {
      // given
      const component:ComponentImplementationInfo = getImplementation('FunctionWithExtendedPropertiesType');
      const expectedProps:ComponentMetadata = {
        name: 'FunctionWithExtendedPropertiesType',
        properties: [
          {
            description: '',
            isRequired: false,
            name: 'children',
            type: { name: 'string', structure: {} },
          },
          {
            description: 'Documentation of inherited property',
            isRequired: false,
            name: 'action',
            type: { name: 'number', structure: {} },
          },
          {
            description: '',
            isRequired: false,
            name: 'hidden',
            type: { name: 'boolean', structure: {} },
          },
          {
            description: '',
            isRequired: true,
            name: 'id',
            type: { name: 'string', structure: {} },
          },
        ],
      };

      // when
      return serializeTSComponent(component).then((serializedProps) => {
        // then
        expect(serializedProps.result).toEqual(expectedProps);
        expect(serializedProps.warnings).toEqual([]);
      });
    });

    // @todo #20211: Support for arrow function component with static default props
    it.skip('serializes arrow function component with defaults declared as static property', () => {
      // given
      const component:ComponentImplementationInfo = getImplementation('ArrowFunctionWithDefaultsAsStaticProperty');
      const expectedProps:ComponentMetadata = {
        name: 'ArrowFunctionWithDefaultsAsStaticProperty',
        properties: [
          {
            description: '',
            isRequired: false,
            name: 'children',
            type: { name: 'node', structure: {} },
          },
          {
            description: '',
            isRequired: true,
            name: 'id',
            type: { name: 'string', structure: {} },
          },
          {
            description: '',
            isRequired: true,
            name: 'appearance',
            type: { name: 'string', structure: {} },
          },
          {
            defaultValue: { value: 'neutral' },
            description: '',
            isRequired: false,
            name: 'modifier',
            type: { name: 'string', structure: {} },
          },
          {
            defaultValue: { value: false },
            description: '',
            isRequired: false,
            name: 'hidden',
            type: { name: 'boolean', structure: {} },
          },
        ],
      };

      // when
      return serializeTSComponent(component).then((serializedProps) => {
        // then
        expect(serializedProps.result).toEqual(expectedProps);
        expect(serializedProps.warnings).toEqual([]);
      });
    });

    it('serializes default-exported arrow function with defaults declared in destructuring assignment', () => {
      // given
      const component:ComponentImplementationInfo =
        getImplementation('DefaultExportedArrowFunctionWithDefaultsInDestructuring');
      const expectedProps:ComponentMetadata = {
        name: 'DefaultExportedArrowFunctionWithDefaultsInDestructuring',
        properties: [
          {
            description: '',
            isRequired: false,
            name: 'children',
            type: { name: 'node', structure: {} },
          },
          {
            defaultValue: { value: 'neutral' },
            description: '',
            isRequired: false,
            name: 'modifier',
            type: { name: 'string', structure: {} },
          },
          {
            defaultValue: { value: false },
            description: '',
            isRequired: true,
            name: 'hidden',
            type: { name: 'boolean', structure: {} },
          },
        ],
      };

      // when
      return serializeTSComponent(component).then((serializedProps) => {
        // then
        expect(serializedProps.result).toEqual(expectedProps);
        expect(serializedProps.warnings).toEqual([]);
      });
    });

    it('serializes functional component with defaults declared in destructuring assignment', () => {
      // given
      const component:ComponentImplementationInfo = getImplementation('FunctionWithDefaultsInDestructuring');
      const expectedProps:ComponentMetadata = {
        name: 'FunctionWithDefaultsInDestructuring',
        properties: [
          {
            description: '',
            isRequired: false,
            name: 'children',
            type: { name: 'node', structure: {} },
          },
          {
            description: '',
            isRequired: true,
            name: 'id',
            type: { name: 'string', structure: {} },
          },
          {
            description: '',
            isRequired: true,
            name: 'appearance',
            type: { name: 'string', structure: {} },
          },
          {
            defaultValue: { value: 'neutral' },
            description: '',
            isRequired: false,
            name: 'modifier',
            type: { name: 'string', structure: {} },
          },
          {
            defaultValue: { value: false },
            description: '',
            isRequired: true,
            name: 'hidden',
            type: { name: 'boolean', structure: {} },
          },
        ],
      };

      // when
      return serializeTSComponent(component).then((serializedProps) => {
        // then
        expect(serializedProps.result).toEqual(expectedProps);
        expect(serializedProps.warnings).toEqual([]);
      });
    });

    it('serializes component props with index type', () => {
      // given
      const component:ComponentImplementationInfo = getImplementation('ClassWithIndexedType');
      const expectedProps:ComponentMetadata = {
        name: 'ClassWithIndexedType',
        properties: [
          {
            description: '',
            isRequired: true,
            name: 'propLocal',
            type: { name: 'string', structure: {} },
          },
          {
            description: '',
            isRequired: true,
            name: 'propAliasShape',
            type: { name: 'shape', structure: {} },
          },
          {
            description: '',
            isRequired: true,
            name: 'propAliasNumber',
            type: { name: 'number', structure: {} },
          },
        ],
      };

      // when
      return serializeTSComponent(component).then((serializedProps) => {
        // then
        expect(serializedProps.result).toEqual(expectedProps);
        expect(serializedProps.warnings).toEqual([]);
      });
    });

    it('serializes component props with union type in type alias', () => {
      // given
      const component:ComponentImplementationInfo = getImplementation('ClassWithUnionTypeInAliasType');
      const expectedProps:ComponentMetadata = {
        name: 'ClassWithUnionTypeInAliasType',
        properties: [
          {
            description: '',
            isRequired: true,
            name: 'aliasedUnionProp',
            type: {
              name: 'union',
              structure: {
                elements: expect.arrayContaining([
                  { name: 'literal', structure: { value: 'slim' } },
                  { name: 'literal', structure: { value: 'medium' } },
                  { name: 'literal', structure: { value: 'large' } },
                ]),
              },
            },
          },
          {
            description: '',
            isRequired: true,
            name: 'nestedUnionProp',
            type: {
              name: 'union',
              structure: {
                elements: expect.arrayContaining([
                  { name: 'literal', structure: { value: 'some' } },
                  { name: 'literal', structure: { value: 1 } },
                  { name: 'literal', structure: { value: 'slim' } },
                  { name: 'literal', structure: { value: 'medium' } },
                  { name: 'literal', structure: { value: 'large' } },
                ]),
              },
            },
          },
        ],
      };

      // when
      return serializeTSComponent(component).then((serializedProps) => {
        // then
        expect(serializedProps.result).toEqual(expectedProps);
        expect(serializedProps.warnings).toEqual([]);
      });
    });

    it('serializes component props with typeof/keyof operators', () => {
      // given
      const component:ComponentImplementationInfo = getImplementation('ClassWithKeyOfTypeOfOperatorInType');
      const expectedProps:ComponentMetadata = {
        name: 'ClassWithKeyOfTypeOfOperatorInType',
        properties: [
          {
            description: '',
            isRequired: true,
            name: 'typeOfProp',
            type: { name: 'number', structure: {} },
          },
          {
            description: '',
            isRequired: true,
            name: 'keyOfProp',
            type: { name: 'union',
              structure: {
                elements: [
                  { name: 'literal', structure: { value: 'name' } },
                  { name: 'literal', structure: { value: 'value' } },
                  { name: 'literal', structure: { value: 'nested' } },
                ],
              },
            },
          },
          {
            description: '',
            isRequired: true,
            name: 'keyOfTypeOfProp',
            type: { name: 'union',
              structure: {
                elements: [
                  { name: 'literal', structure: { value: 'name' } },
                  { name: 'literal', structure: { value: 'value' } },
                  { name: 'literal', structure: { value: 'nested' } },
                ],
              },
            },
          },
        ],
      };

      // when
      return serializeTSComponent(component).then((serializedProps) => {
        // then
        expect(serializedProps.result).toEqual(expectedProps);
        expect(serializedProps.warnings).toEqual([]);
      });
    });

    it('doesn\'t support imported Component type in other way than `React.Component`', async () => {
      // given
      const component:ComponentImplementationInfo = getImplementation('ClassWithoutImportedReactComponent');

      // when
      await expect(serializeTSComponent(component)).rejects.toThrowError('No component properties found');
    });

    it('rejects returned promise when there is no React component in the given file', (done) => {
      // given
      const component:ComponentImplementationInfo = getImplementation('FileWithoutComponent');

      // when
      serializeTSComponent(component).catch((error) => {
        // then
        expect(error.message).toMatch(/No .*component .*found/i);
        done();
      });
    });

    it('rejects returned promise when there is no file at the given path', (done) => {
      // given
      const component:ComponentImplementationInfo = getImplementation('NonexistentFile');

      // when
      serializeTSComponent(component).catch(() => {
        // then
        done();
      });
    });

    describe('file with default exported component composed with HOC is given', () => {
      const getI18nComponentMetadata:(expectedName:string) => ComponentMetadata = (expectedName:string) => {
        return {
          name: expectedName,
          properties: [
            {
              description: '',
              isRequired: true,
              name: 'appearance',
              type: {
                name: 'union',
                structure: {
                  elements: [
                    { name: 'literal', structure: { value: 'secondary' } },
                    { name: 'literal', structure: { value: 'primary' } },
                    { name: 'literal', structure: { value: 'link' } },
                  ],
                },
              },
            },
            {
              description: '',
              isRequired: false,
              name: 'children',
              type: { name: 'string', structure: {} },
            },
            {
              description: '',
              isRequired: true,
              name: 'i18n',
              type: { name: 'string', structure: {} },
            },
          ],
        };
      };

      it('serializes class component specified by a comment', async () => {
        // when
        const expectedMetadata:ComponentMetadata =
          getI18nComponentMetadata('ClassPrependedWithCommentToBeComposedWithHOC');

        // given
        const component:ComponentImplementationInfo =
          getImplementation('DefaultExportedClassComposedWithHOCAndComment');

        // when
        const serializedProps:Warned<ComponentMetadata> = await serializeTSComponent(component);

        // then
        expect(serializedProps.warnings).toEqual([]);
        expect(serializedProps.result).toEqual(expectedMetadata);
      });

      it('serializes functional component specified by a comment', async () => {
        // when
        const expectedMetadata:ComponentMetadata =
          getI18nComponentMetadata('FunctionalComponentPrependedWithCommentToBeComposedWithHOC');

        // given
        const component:ComponentImplementationInfo =
          getImplementation('DefaultExportedFunctionalComponentComposedWithHOCAndComment');

        // when
        const serializedProps:Warned<ComponentMetadata> = await serializeTSComponent(component);

        // then
        expect(serializedProps.warnings).toEqual([]);
        expect(serializedProps.result).toEqual(expectedMetadata);
      });

      it('serializes class component matching file name', async () => {
        // when
        const expectedMetadata:ComponentMetadata =
          getI18nComponentMetadata('DefaultExportedClassMatchingFilenameComposedWithHOC');

        const component:ComponentImplementationInfo =
          getImplementation('DefaultExportedClassMatchingFilenameComposedWithHOC');

        // when
        const serializedProps:Warned<ComponentMetadata> = await serializeTSComponent(component);

        // then
        expect(serializedProps.warnings).toEqual([]);
        expect(serializedProps.result).toEqual(expectedMetadata);
      });

      it('serializes functional component matching file name', async () => {
        // when
        const expectedMetadata:ComponentMetadata =
          getI18nComponentMetadata('DefaultExportedFunctionalComponentMatchingFilenameComposedWithHOC');

        const component:ComponentImplementationInfo =
          getImplementation('DefaultExportedFunctionalComponentMatchingFilenameComposedWithHOC');

        // when
        const serializedProps:Warned<ComponentMetadata> = await serializeTSComponent(component);

        // then
        expect(serializedProps.warnings).toEqual([]);
        expect(serializedProps.result).toEqual(expectedMetadata);
      });
    });
  });

  function getImplementation(componentName:string):ComponentImplementationInfo {
    return {
      framework: 'reactjs',
      lang: 'typescript',
      path: getTypeScriptComponentPath(componentName),
    };
  }
});
