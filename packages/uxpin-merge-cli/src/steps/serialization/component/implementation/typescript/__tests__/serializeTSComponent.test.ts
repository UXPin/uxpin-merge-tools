import { Warned } from '../../../../../../common/warning/Warned';
import { ComponentImplementationInfo } from '../../../../../discovery/component/ComponentInfo';
import { ComponentMetadata } from '../../../ComponentDefinition';
import { serializeTSComponent } from '../serializeTSComponent';
import { getImplementation } from './utils/getImplementation';

describe('serializeTSComponent', () => {
  describe('providing array of objects describing all properties of the TypeScript component', () => {
    it('serializes functional component with primitive property types', async () => {
      // given
      const component: ComponentImplementationInfo = getImplementation('FunctionPrimitivesOnly');
      const expectedMetadata: ComponentMetadata = {
        defaultExported: true,
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
        wrappers: [],
      };

      // when
      const serializedProps = await serializeTSComponent(component);
      // then
      expect(serializedProps.result).toEqual(expectedMetadata);
      expect(serializedProps.warnings).toEqual([]);
    });

    it('serializes class component with date property ', async () => {
      // given
      const component: ComponentImplementationInfo = getImplementation('ClassWithDateType');
      const expectedMetadata: ComponentMetadata = {
        componentDocUrl: undefined,
        defaultExported: true,
        name: 'ClassWithDateType',
        namespace: undefined,
        properties: [
          {
            defaultValue: {
              value: '2016-07-19T20:23:01.804Z',
            },
            description: 'Dates only',
            isRequired: true,
            name: 'dateInteger',
            type: {
              name: 'date',
              structure: {},
            },
          },
          {
            defaultValue: {
              value: '2010-08-08T00:00:00.000Z',
            },
            description: '',
            isRequired: true,
            name: 'dateString',
            type: {
              name: 'date',
              structure: {},
            },
          },
          {
            defaultValue: {
              value: new Date(1997, 1, 1, 1, 1, 1, 1).toISOString(), // should pass no matter the timezone the code runs!
            },
            description: '',
            isRequired: true,
            name: 'dateRest',
            type: {
              name: 'date',
              structure: {},
            },
          },
        ],
        wrappers: [],
      };

      // when
      const serializedProps = await serializeTSComponent(component);
      // then
      expect(serializedProps.result).toEqual(expectedMetadata);
      expect(serializedProps.warnings).toEqual([]);
    });

    it('serializes class component with empty date property ', async () => {
      // given
      const component: ComponentImplementationInfo = getImplementation('ClassWithEmptyDateType');
      // when
      const serializedProps = await serializeTSComponent(component);
      // then
      expect(serializedProps.result).toEqual(
        expect.objectContaining({
          name: expect.any(String),
          properties: expect.arrayContaining([
            expect.objectContaining({
              defaultValue: expect.objectContaining({
                value: expect.any(String),
              }),
            }),
          ]),
          wrappers: expect.any(Array),
        })
      );
      expect(serializedProps.warnings).toEqual([]);
    });

    it('serializes class component with enum property types', async () => {
      // given
      const component: ComponentImplementationInfo = getImplementation('ClassEnumTypes');
      const expectedMetadata: ComponentMetadata = {
        defaultExported: true,
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
                elements: [
                  { name: 'enum', structure: { label: 'Large', value: 'large' } },
                  { name: 'enum', structure: { label: 'Medium', value: 'medium' } },
                  { name: 'enum', structure: { label: 'Small', value: 'small' } },
                ],
              },
            },
          },
          {
            defaultValue: {
              value: 1,
            },
            description: '',
            isRequired: true,
            name: 'propNumeric',
            type: {
              name: 'union',
              structure: {
                elements: [
                  { name: 'enum', structure: { label: 'Zero', value: 0 } },
                  { name: 'enum', structure: { label: 'One', value: 1 } },
                ],
              },
            },
          },
          {
            description: '',
            isRequired: true,
            name: 'propCustomNumeric',
            type: {
              name: 'union',
              structure: {
                elements: [
                  { name: 'enum', structure: { label: 'Blue', value: 3 } },
                  { name: 'enum', structure: { label: 'Red', value: 4 } },
                  { name: 'enum', structure: { label: 'Green', value: 5 } },
                ],
              },
            },
          },
          {
            description: '',
            isRequired: true,
            name: 'propComputed',
            type: {
              name: 'union',
              structure: {
                elements: [
                  { name: 'enum', structure: { label: 'Friday', value: 1 } },
                  { name: 'enum', structure: { label: 'Sunday', value: 40 } },
                ],
              },
            },
          },
          {
            defaultValue: {
              value: 0,
            },
            description: '',
            isRequired: true,
            name: 'propHeterogeneous',
            type: {
              name: 'union',
              structure: {
                elements: [
                  { name: 'enum', structure: { label: 'No', value: 0 } },
                  { name: 'enum', structure: { label: 'Yes', value: 'YES' } },
                ],
              },
            },
          },
        ],
        wrappers: [],
      };

      // when
      const serializedProps = await serializeTSComponent(component);
      // then
      expect(serializedProps.result).toEqual(expectedMetadata);
      expect(serializedProps.warnings).toEqual([]);
    });

    it('serializes class component with default property values', async () => {
      // given
      const component: ComponentImplementationInfo = getImplementation('ClassWithDefaults');
      const expectedMetadata: ComponentMetadata = {
        defaultExported: true,
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
        wrappers: [],
      };

      // when
      const serializedProps = await serializeTSComponent(component);
      // then
      expect(serializedProps.result).toEqual(expectedMetadata);
      expect(serializedProps.warnings).toEqual([]);
    });

    it('serializes component with interface property type', async () => {
      // given
      const component: ComponentImplementationInfo = getImplementation('ClassInterfaceTypes');
      const expectedMetadata: ComponentMetadata = {
        defaultExported: true,
        name: 'ClassInterfaceTypes',
        properties: [
          {
            description: '',
            isRequired: true,
            name: 'item',
            type: { name: 'shape', structure: {} },
          },
        ],
        wrappers: [],
      };

      // when
      const serializedProps = await serializeTSComponent(component);
      // then
      expect(serializedProps.result).toEqual(expectedMetadata);
      expect(serializedProps.warnings).toEqual([]);
    });

    it('serializes component with imported interface property type', async () => {
      // given
      const component: ComponentImplementationInfo = getImplementation('FunctionWithImportedTypes');
      const expectedMetadata: ComponentMetadata = {
        defaultExported: true,
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
        wrappers: [],
      };

      // when
      const serializedProps = await serializeTSComponent(component);
      // then
      expect(serializedProps.result).toEqual(expectedMetadata);
      expect(serializedProps.warnings).toEqual([]);
    });

    it('serializes component with imported type of properties object', async () => {
      // given
      const component: ComponentImplementationInfo = getImplementation('ClassWithImportedPropertiesType');
      const expectedMetadata: ComponentMetadata = {
        defaultExported: true,
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
        wrappers: [],
      };

      // when
      const serializedProps = await serializeTSComponent(component);
      // then
      expect(serializedProps.result).toEqual(expectedMetadata);
      expect(serializedProps.warnings).toEqual([]);
    });

    it('serializes component with function property types', async () => {
      // given
      const component: ComponentImplementationInfo = getImplementation('ClassWithFunctionTypes');
      const expectedMetadata: ComponentMetadata = {
        defaultExported: true,
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
        wrappers: [],
      };

      // when
      const serializedProps = await serializeTSComponent(component);
      // then
      expect(serializedProps.result).toEqual(expectedMetadata);
      expect(serializedProps.warnings).toEqual([]);
    });

    it('serializes component with combined type of properties object', async () => {
      // given
      const component: ComponentImplementationInfo = getImplementation('ClassWithCombinedPropertiesType');
      const expectedMetadata: ComponentMetadata = {
        defaultExported: true,
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
        wrappers: [],
      };

      // when
      const serializedProps = await serializeTSComponent(component);
      // then
      expect(serializedProps.result).toEqual(expectedMetadata);
      expect(serializedProps.warnings).toEqual([]);
    });

    it('serializes component with extended type of properties object', async () => {
      // given
      const component: ComponentImplementationInfo = getImplementation('FunctionWithExtendedPropertiesType');
      const expectedMetadata: ComponentMetadata = {
        defaultExported: true,
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
        wrappers: [],
      };

      // when
      const serializedProps = await serializeTSComponent(component);
      // then
      expect(serializedProps.result).toEqual(expectedMetadata);
      expect(serializedProps.warnings).toEqual([]);
    });

    // @todo #20211: Support for arrow function component with static default props
    it.skip('serializes arrow function component with defaults declared as static property', async () => {
      // given
      const component: ComponentImplementationInfo = getImplementation('ArrowFunctionWithDefaultsAsStaticProperty');
      const expectedMetadata: ComponentMetadata = {
        defaultExported: true,
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
        wrappers: [],
      };

      // when
      const serializedProps = await serializeTSComponent(component);
      // then
      expect(serializedProps.result).toEqual(expectedMetadata);
      expect(serializedProps.warnings).toEqual([]);
    });

    it('serializes default-exported arrow function with defaults declared in destructuring assignment', async () => {
      // given
      const component: ComponentImplementationInfo = getImplementation(
        'DefaultExportedArrowFunctionWithDefaultsInDestructuring'
      );
      const expectedMetadata: ComponentMetadata = {
        defaultExported: true,
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
        wrappers: [],
      };

      // when
      const serializedProps = await serializeTSComponent(component);
      // then
      expect(serializedProps.result).toEqual(expectedMetadata);
      expect(serializedProps.warnings).toEqual([]);
    });

    it('serializes functional component with defaults declared in destructuring assignment', async () => {
      // given
      const component: ComponentImplementationInfo = getImplementation('FunctionWithDefaultsInDestructuring');
      const expectedMetadata: ComponentMetadata = {
        defaultExported: true,
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
        wrappers: [],
      };

      // when
      const serializedProps = await serializeTSComponent(component);
      // then
      expect(serializedProps.result).toEqual(expectedMetadata);
      expect(serializedProps.warnings).toEqual([]);
    });

    it('serializes component props with index type', async () => {
      // given
      const component: ComponentImplementationInfo = getImplementation('ClassWithIndexedType');
      const expectedMetadata: ComponentMetadata = {
        defaultExported: true,
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
        wrappers: [],
      };

      // when
      const serializedProps = await serializeTSComponent(component);
      // then
      expect(serializedProps.result).toEqual(expectedMetadata);
      expect(serializedProps.warnings).toEqual([]);
    });

    it('serializes component props with extended interface type', async () => {
      // given
      const component: ComponentImplementationInfo = getImplementation('ClassWithExtendedInterface');
      const expectedMetadata: ComponentMetadata = {
        defaultExported: true,
        name: 'ClassWithExtendedInterface',
        properties: [
          {
            description: '',
            isRequired: false,
            name: 'helpText',
            type: { name: 'string', structure: {} },
          },
          {
            description: '',
            isRequired: true,
            name: 'image',
            type: { name: 'string', structure: {} },
          },
          {
            description: '',
            isRequired: true,
            name: 'iconType',
            type: { name: 'string', structure: {} },
          },
          {
            description: '',
            isRequired: true,
            name: 'size',
            type: { name: 'number', structure: {} },
          },
          {
            description: '',
            isRequired: false,
            name: 'disabled',
            type: { name: 'boolean', structure: {} },
          },
          {
            description: '',
            isRequired: true,
            name: 'actionType',
            type: { name: 'string', structure: {} },
          },
        ],
        wrappers: [],
      };

      // when
      const serializedProps = await serializeTSComponent(component);
      // then
      expect(serializedProps.result).toEqual(expectedMetadata);
      expect(serializedProps.warnings).toEqual([]);
    });

    it('serializes functional component with intersection type of properties object', async () => {
      // given
      const component: ComponentImplementationInfo = getImplementation('FunctionWithCombinedPropertiesType');
      const expectedMetadata: ComponentMetadata = {
        defaultExported: true,
        name: 'FunctionWithCombinedPropertiesType',
        properties: [
          {
            description: 'Local property',
            isRequired: true,
            name: 'id',
            type: { name: 'string', structure: {} },
          },
          {
            description: '',
            isRequired: true,
            name: 'hidden',
            type: { name: 'boolean', structure: {} },
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
        wrappers: [],
      };

      // when
      const serializedProps = await serializeTSComponent(component);
      // then
      expect(serializedProps.result).toEqual(expectedMetadata);
      expect(serializedProps.warnings).toEqual([]);
    });

    it('serializes functional component with intersection and union type of properties object', async () => {
      // given
      const component: ComponentImplementationInfo = getImplementation('FunctionWithCombinedUnionPropertiesType');
      const expectedMetadata: ComponentMetadata = {
        defaultExported: true,
        name: 'FunctionWithCombinedUnionPropertiesType',
        properties: [
          {
            description: 'Local property',
            isRequired: true,
            name: 'id',
            type: { name: 'string', structure: {} },
          },
          {
            description: '',
            isRequired: false,
            name: 'disabled',
            type: { name: 'boolean', structure: {} },
          },
          {
            description: '',
            isRequired: true,
            name: 'i18n',
            type: { name: 'string', structure: {} },
          },
          {
            description: '',
            isRequired: false,
            name: 'readOnly',
            type: { name: 'boolean', structure: {} },
          },
          {
            description: '',
            isRequired: false,
            name: 'onChange',
            type: { name: 'func', structure: {} },
          },
        ],
        wrappers: [],
      };

      // when
      const serializedProps = await serializeTSComponent(component);
      // then
      expect(serializedProps.result).toEqual(expectedMetadata);
      expect(serializedProps.warnings).toEqual([]);
    });

    it('serializes functional component with property with intersection type', async () => {
      // given
      const component: ComponentImplementationInfo = getImplementation('FunctionWithCombinedProperty');
      const expectedMetadata: ComponentMetadata = {
        defaultExported: true,
        name: 'FunctionWithCombinedProperty',
        properties: [
          {
            description: 'Local property',
            isRequired: true,
            name: 'id',
            type: { name: 'string', structure: {} },
          },
          {
            description: '',
            isRequired: true,
            name: 'user',
            type: { name: 'shape', structure: {} },
          },
        ],
        wrappers: [],
      };

      // when
      const serializedProps = await serializeTSComponent(component);
      // then
      expect(serializedProps.result).toEqual(expectedMetadata);
      expect(serializedProps.warnings).toEqual([]);
    });

    it(
      'serializes component props imported from shorthanded file ' + 'exporting directly from import from index file',
      async () => {
        // given
        const component: ComponentImplementationInfo = getImplementation(
          'ClassWithTypeImportedFromIndexFileExportingFromImport'
        );
        const expectedMetadata: ComponentMetadata = {
          defaultExported: true,
          name: 'ClassWithTypeImportedFromIndexFileExportingFromImport',
          properties: [
            {
              description: '',
              isRequired: true,
              name: 'propLocal',
              type: {
                name: 'shape',
                structure: {},
              },
            },
          ],
          wrappers: [],
        };

        // when
        const serializedProps = await serializeTSComponent(component);
        // then
        expect(serializedProps.result).toEqual(expectedMetadata);
        expect(serializedProps.warnings).toEqual([]);
      }
    );

    it('serializes component props with union type in type alias', async () => {
      // given
      const component: ComponentImplementationInfo = getImplementation('ClassWithUnionTypeInAliasType');
      const expectedMetadata: ComponentMetadata = {
        defaultExported: true,
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
        wrappers: [],
      };

      // when
      const serializedProps = await serializeTSComponent(component);
      // then
      expect(serializedProps.result).toEqual(expectedMetadata);
      expect(serializedProps.warnings).toEqual([]);
    });

    it('serializes component props with typeof/keyof operators', async () => {
      // given
      const component: ComponentImplementationInfo = getImplementation('ClassWithKeyOfTypeOfOperatorInType');
      const expectedMetadata: ComponentMetadata = {
        componentDocUrl: undefined,
        defaultExported: true,
        name: 'ClassWithKeyOfTypeOfOperatorInType',
        namespace: undefined,
        properties: [
          {
            description: '',
            isRequired: true,
            name: 'typeOfProp',
            type: { name: 'literal', structure: { value: 5 } },
          },
          {
            description: '',
            isRequired: true,
            name: 'keyOfProp',
            type: {
              name: 'union',
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
            type: {
              name: 'union',
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
        wrappers: [],
      };

      // when
      const serializedProps = await serializeTSComponent(component);
      // then
      expect(serializedProps.result).toEqual(expectedMetadata);
      expect(serializedProps.warnings).toEqual([]);
    });

    it('serializes component props with array of union type', async () => {
      // given
      const component: ComponentImplementationInfo = getImplementation('ClassWithArrayOfUnionType');
      const expectedMetadata: ComponentMetadata = {
        defaultExported: true,
        name: 'ClassWithArrayOfUnionType',
        properties: [
          {
            description: '',
            isRequired: true,
            name: 'propWithArrayOfUnion',
            type: {
              name: 'union',
              structure: {
                elements: expect.arrayContaining([
                  { name: 'string', structure: {} },
                  { name: 'element', structure: {} },
                  { name: 'array', structure: {} },
                ]),
              },
            },
          },
        ],
        wrappers: [],
      };

      // when
      const serializedProps = await serializeTSComponent(component);
      // then
      expect(serializedProps.result).toEqual(expectedMetadata);
      expect(serializedProps.warnings).toEqual([]);
    });

    it('serializes component props with two dimensional array', async () => {
      // given
      const component: ComponentImplementationInfo = getImplementation('ClassWithTwoDimensionalArray');
      const expectedMetadata: ComponentMetadata = {
        defaultExported: true,
        name: 'ClassWithTwoDimensionalArray',
        properties: [
          {
            description: '',
            isRequired: true,
            name: 'rows',
            type: {
              name: 'array',
              structure: {},
            },
          },
        ],
        wrappers: [],
      };

      // when
      const serializedProps = await serializeTSComponent(component);
      // then
      expect(serializedProps.result).toEqual(expectedMetadata);
      expect(serializedProps.warnings).toEqual([]);
    });

    it("doesn't support imported Component type in other way than `React.Component`", async () => {
      // given
      const component: ComponentImplementationInfo = getImplementation('ClassWithoutImportedReactComponent');

      // when
      await expect(serializeTSComponent(component)).rejects.toThrowError('No component properties found');
    });

    it('rejects returned promise when there is no React component in the given file', (done) => {
      // given
      const component: ComponentImplementationInfo = getImplementation('FileWithoutComponent');

      // when
      serializeTSComponent(component).catch((error) => {
        // then
        expect(error.message).toMatch(/No .*component .*found/i);
        done();
      });
    });

    it('rejects returned promise when there is no file at the given path', (done) => {
      // given
      const component: ComponentImplementationInfo = getImplementation('NonexistentFile');

      // when
      serializeTSComponent(component).catch(() => {
        // then
        done();
      });
    });

    describe('file with default exported component composed with HOC is given', () => {
      const getI18nComponentMetadata: (expectedName: string) => ComponentMetadata = (expectedName: string) => {
        return {
          defaultExported: true,
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
          wrappers: [],
        };
      };

      it('serializes class component specified by a comment', async () => {
        // when
        const expectedMetadata: ComponentMetadata = getI18nComponentMetadata(
          'ClassPrependedWithCommentToBeComposedWithHOC'
        );

        // given
        const component: ComponentImplementationInfo = getImplementation(
          'DefaultExportedClassComposedWithHOCAndComment'
        );

        // when
        const serializedProps: Warned<ComponentMetadata> = await serializeTSComponent(component);

        // then
        expect(serializedProps.warnings).toEqual([]);
        expect(serializedProps.result).toEqual(expectedMetadata);
      });

      it('serializes functional component specified by a comment', async () => {
        // when
        const expectedMetadata: ComponentMetadata = getI18nComponentMetadata(
          'FunctionalComponentPrependedWithCommentToBeComposedWithHOC'
        );

        // given
        const component: ComponentImplementationInfo = getImplementation(
          'DefaultExportedFunctionalComponentComposedWithHOCAndComment'
        );

        // when
        const serializedProps: Warned<ComponentMetadata> = await serializeTSComponent(component);

        // then
        expect(serializedProps.warnings).toEqual([]);
        expect(serializedProps.result).toEqual(expectedMetadata);
      });

      it('serializes class component matching file name', async () => {
        // when
        const expectedMetadata: ComponentMetadata = getI18nComponentMetadata(
          'DefaultExportedClassMatchingFilenameComposedWithHOC'
        );

        const component: ComponentImplementationInfo = getImplementation(
          'DefaultExportedClassMatchingFilenameComposedWithHOC'
        );

        // when
        const serializedProps: Warned<ComponentMetadata> = await serializeTSComponent(component);

        // then
        expect(serializedProps.warnings).toEqual([]);
        expect(serializedProps.result).toEqual(expectedMetadata);
      });

      it('serializes functional component matching file name', async () => {
        // when
        const expectedMetadata: ComponentMetadata = getI18nComponentMetadata(
          'DefaultExportedFunctionalComponentMatchingFilenameComposedWithHOC'
        );

        const component: ComponentImplementationInfo = getImplementation(
          'DefaultExportedFunctionalComponentMatchingFilenameComposedWithHOC'
        );

        // when
        const serializedProps: Warned<ComponentMetadata> = await serializeTSComponent(component);

        // then
        expect(serializedProps.warnings).toEqual([]);
        expect(serializedProps.result).toEqual(expectedMetadata);
      });
    });

    it('serializes component with custom description, name and ignore', async () => {
      // given
      const component: ComponentImplementationInfo = getImplementation('ClassWithPropTypesWithComments');
      const expectedMetadata: ComponentMetadata = {
        defaultExported: true,
        name: 'ClassWithPropTypesWithComments',
        properties: [
          {
            customDescription: `Multiline
description
of
the
component.`,
            customName: 'type',
            description: '',
            isRequired: true,
            name: 'buttonType',
            type: {
              name: 'string',
              structure: {},
            },
          },
          {
            customDescription: 'Custom description',
            customName: 'disabled',
            description: 'This is description of isDisabled property',
            hidden: true,
            isRequired: true,
            name: 'isDisabled',
            type: {
              name: 'boolean',
              structure: {},
            },
          },
          {
            customDescription: 'some alternative custom function description',
            description: 'Callback when a link is clicked',
            hidden: true,
            isRequired: true,
            name: 'onClick',
            type: {
              name: 'func',
              structure: {},
            },
          },
        ],
        wrappers: [],
      };

      // when
      const serializedProps = await serializeTSComponent(component);
      // then
      expect(serializedProps.result).toEqual(expectedMetadata);
      expect(serializedProps.warnings).toEqual([]);
    });

    it('serializes component with invalid custom names and gives proper warning', async () => {
      // given
      const component: ComponentImplementationInfo = getImplementation('ClassWithCorruptedComments');
      const expectedMetadata: ComponentMetadata = {
        defaultExported: true,
        name: 'ClassWithCorruptedComments',
        properties: [
          {
            customName: 'duplicatedCustomName',
            description: '',
            isRequired: true,
            name: 'buttonType',
            type: {
              name: 'string',
              structure: {},
            },
          },
          {
            customName: 'duplicatedCustomName',
            description: '',
            isRequired: true,
            name: 'isDisabled',
            type: {
              name: 'boolean',
              structure: {},
            },
          },
          {
            customName: 'isDisabled',
            description: '',
            isRequired: true,
            name: 'isDisabledDuplicate',
            type: {
              name: 'boolean',
              structure: {},
            },
          },
        ],
        wrappers: [],
      };

      // when
      const serializedProps = await serializeTSComponent(component);
      // then
      expect(serializedProps.result).toEqual(expectedMetadata);
      expect(serializedProps.warnings).toEqual([
        {
          message: 'Duplicated custom property name ("duplicatedCustomName") for "isDisabled"',
          sourcePath: component.path,
        },
        {
          message: 'Custom property name ("isDisabled") for "isDisabledDuplicate" matches existing property name',
          sourcePath: component.path,
        },
      ]);
    });

    describe('FunctionWithMultilevelNamespaceDeclaration', () => {
      let serialized: Warned<ComponentMetadata>;

      beforeAll(async () => {
        const component: ComponentImplementationInfo = getImplementation('FunctionWithMultilevelNamespaceDeclaration');
        serialized = await serializeTSComponent(component);
      });

      it('returns correct component name', () => {
        expect(serialized.result.name).toEqual('FunctionWithMultilevelNamespaceDeclaration');
      });

      it('returns annotated namespace value', () => {
        expect(serialized.result.namespace!.name).toEqual('Some.Nested.Namespace');
      });
    });
  });
});
