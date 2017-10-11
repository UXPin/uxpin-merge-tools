import { WarningDetails } from '../../../../../../../src/common/warning/WarningDetails';
import { ComponentMetadata } from '../../../../../../../src/steps/serialization/component/ComponentDefinition';
// tslint:disable-next-line:max-line-length
import { serializeJSComponent } from '../../../../../../../src/steps/serialization/component/implementation/javascript/serializeJSComponent';
import { getJavaScriptComponentPath } from '../../../../../../utils/resources/getExampleComponentPath';

describe('serializeJSComponentProps', () => {
  describe('providing array of objects describing all properties of the JavaScript component', () => {
    it('serializes functional component with primitive property types', () => {
      // given
      const componentPath:string = getJavaScriptComponentPath('FunctionPrimitivesOnly');
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
      return serializeJSComponent(componentPath).then((serializedProps) => {
        // then
        expect(serializedProps.result).toEqual(expectedProps);
        expect(serializedProps.warnings).toEqual([]);
      });
    });

    it('serializes class component with enum property types', () => {
      // given
      const componentPath:string = getJavaScriptComponentPath('ClassEnumTypes');
      const expectedProps:ComponentMetadata = {
        name: 'ClassEnumTypes',
        properties: [
          {
            description: 'oneOfType property type',
            isRequired: false,
            name: 'children',
            type: {
              name: 'union',
              structure: {
                elements: [
                  { name: 'string', structure: {} },
                  { name: 'number', structure: {} },
                  { name: 'typedArray', structure: { memberType: { name: 'node', structure: {} } } },
                ],
              },
            },
          },
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
        ],
      };

      // when
      return serializeJSComponent(componentPath).then((serializedProps) => {
        // then
        expect(serializedProps.result).toEqual(expectedProps);
        expect(serializedProps.warnings).toEqual([]);
      });
    });

    it('serializes class component with default property values', () => {
      // given
      const componentPath:string = getJavaScriptComponentPath('ClassWithDefaults');
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
                elements: [
                  { name: 'literal', structure: { value: 'secondary' } },
                  { name: 'literal', structure: { value: 'primary' } },
                  { name: 'literal', structure: { value: 'link' } },
                ],
              },
            },
          },
        ],
      };

      // when
      return serializeJSComponent(componentPath).then((serializedProps) => {
        // then
        expect(serializedProps.result).toEqual(expectedProps);
        expect(serializedProps.warnings).toEqual([]);
      });
    });

    it('serializes component with shape property type', () => {
      // given
      const componentPath:string = getJavaScriptComponentPath('ClassPropShapeType');
      const expectedProps:ComponentMetadata = {
        name: 'ClassPropShapeType',
        properties: [
          {
            description: '',
            isRequired: false,
            name: 'item',
            type: {
              name: 'shape',
              structure: {
                param1: { name: 'string', structure: {} },
                param2: { name: 'string', structure: {} },
                param3: {
                  name: 'shape',
                  structure: {
                    name: { name: 'string', structure: {} },
                  },
                },
              },
            },
          },
        ],
      };

      // when
      return serializeJSComponent(componentPath).then((serializedProps) => {
        // then
        expect(serializedProps.result).toEqual(expectedProps);
        expect(serializedProps.warnings).toEqual([]);
      });
    });

    it('serializes component with shape property type and a default value for it', () => {
      // given
      const componentPath:string = getJavaScriptComponentPath('PropShapeTypeWithDefault');
      const expectedMetadata:ComponentMetadata = {
        name: 'PropShapeTypeWithDefault',
        properties: [
          {
            defaultValue: {
              value: {
                param1: 'param1 default value',
                param3: { name: 'param3.name value' },
              },
            },
            description: '',
            isRequired: false,
            name: 'item',
            type: {
              name: 'shape',
              structure: {
                param1: { name: 'string', structure: {} },
                param2: { name: 'string', structure: {} },
                param3: {
                  name: 'shape',
                  structure: {
                    name: { name: 'string', structure: {} },
                  },
                },
              },
            },
          },
        ],
      };

      // when
      return serializeJSComponent(componentPath).then((serializedProps) => {
        // then
        expect(serializedProps.result).toEqual(expectedMetadata);
        expect(serializedProps.warnings).toEqual([]);
      });
    });

    it('provides warning details for corrupted default property values', () => {
      // given
      const componentPath:string = getJavaScriptComponentPath('CorruptedDefaultPropertyValue');
      const expectedMetadata:ComponentMetadata = {
        name: 'CorruptedDefaultPropertyValue',
        properties: [
          {
            description: '',
            isRequired: true,
            name: 'value',
            type: {
              name: 'string',
              structure: {},
            },
          },
        ],
      };
      const expectedWarning:WarningDetails = {
        message: 'Cannot compute default value for property `value`',
        sourcePath: componentPath,
      };

      // when
      return serializeJSComponent(componentPath).then((serialized) => {
        // then
        expect(serialized.result).toEqual(expectedMetadata);
        expect(serialized.warnings[0].message).toEqual(expectedWarning.message);
        expect(serialized.warnings[0].sourcePath).toEqual(expectedWarning.sourcePath);
        expect(serialized.warnings[0].originalError).toBeInstanceOf(Error);
      });
    });

    it('rejects returned promise when there is no React component in the given file', (done) => {
      // given
      const filePath:string = getJavaScriptComponentPath('FileWithoutComponent');

      // when
      serializeJSComponent(filePath).catch((error) => {
        // then
        expect(error.message).toMatch(/No .*component .*found/i);
        done();
      });
    });

    it('rejects returned promise when there is no file at the given path', (done) => {
      // given
      const filePath:string = getJavaScriptComponentPath('NonexistentFile');

      // when
      serializeJSComponent(filePath).catch((error) => {
        // then
        expect(error.message).toMatch(/No .*such .*file/i);
        done();
      });
    });
  });
});
