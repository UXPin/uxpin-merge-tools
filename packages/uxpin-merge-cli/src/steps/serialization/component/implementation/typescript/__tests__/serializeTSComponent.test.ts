import { getTypeScriptComponentPath } from '../../../../../../../test/utils/resources/getExampleComponentPath';
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
            description: '',
            isRequired: true,
            name: 'width',
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
            type: { name: 'number', structure: {} },
          },
          {
            description: 'Inline function type',
            isRequired: true,
            name: 'onClick',
            type: { name: 'func', structure: {} },
          },
          {
            description: 'Type alias reference',
            isRequired: true,
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
  });

  function getImplementation(componentName:string):ComponentImplementationInfo {
    return {
      framework: 'reactjs',
      lang: 'typescript',
      path: getTypeScriptComponentPath(componentName),
    };
  }
});
