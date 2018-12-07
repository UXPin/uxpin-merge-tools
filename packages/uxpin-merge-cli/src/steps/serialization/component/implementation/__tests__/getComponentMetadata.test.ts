import {
  getJavaScriptComponentPath,
  getTypeScriptComponentPath,
} from '../../../../../../test/utils/resources/getExampleComponentPath';
import { ComponentImplementationInfo } from '../../../../discovery/component/ComponentInfo';
import { ComponentMetadata } from '../../ComponentDefinition';
import { getComponentMetadata } from '../getComponentMetadata';

describe('getComponentMetadata – integration', () => {
  describe('providing array of objects describing all properties of the component', () => {
    it('serializes component implemented in TypeScript', () => {
      // given
      const component:ComponentImplementationInfo = {
        framework: 'reactjs',
        lang: 'typescript',
        path: getTypeScriptComponentPath('IntegrationCombo'),
      };
      const expectedProps:ComponentMetadata = {
        name: 'IntegrationCombo',
        properties: [
          {
            description: '',
            isRequired: true,
            name: 'anyProp',
            type: { name: 'any', structure: {} },
          },
          {
            description: '',
            isRequired: true,
            name: 'arrayProp',
            type: { name: 'array', structure: {} },
          },
          {
            description: '',
            isRequired: true,
            name: 'unionTypeArrayProp',
            type: { name: 'array', structure: {} },
          },
          {
            description: '',
            isRequired: true,
            name: 'booleanProp',
            type: { name: 'boolean', structure: {} },
          },
          {
            description: '',
            isRequired: true,
            name: 'elementProp',
            type: { name: 'element', structure: {} },
          },
          {
            description: '',
            isRequired: true,
            name: 'functionProp',
            type: { name: 'func', structure: {} },
          },
          {
            description: '',
            isRequired: true,
            name: 'stringLiteralUnion',
            type: {
              name: 'union', structure: {
                elements: [
                  { name: 'literal', structure: { value: 'a' } },
                  { name: 'literal', structure: { value: 'b' } },
                ],
              },
            },
          },
          {
            description: '',
            isRequired: true,
            name: 'nodeProp',
            type: { name: 'node', structure: {} },
          },
          {
            description: '',
            isRequired: true,
            name: 'objectProp',
            type: { name: 'shape', structure: {} },
          },
          {
            description: '',
            isRequired: true,
            name: 'typedArray',
            type: { name: 'array', structure: {} },
          },
          {
            description: '',
            isRequired: true,
            name: 'dictionaryProp',
            type: { name: 'shape', structure: {} },
          },
          {
            description: '',
            isRequired: true,
            name: 'empty',
            type: { name: 'unsupported', structure: { raw: '{"type":"undefined"}' } },
          },
          {
            description: '',
            isRequired: false,
            name: 'children',
            type: { name: 'node', structure: {} },
          },
          {
            description: 'Description for `value` property',
            isRequired: true,
            name: 'value',
            type: { name: 'string', structure: {} },
          },
          {
            description: 'Description for optional `id` property',
            isRequired: false,
            name: 'id',
            type: { name: 'number', structure: {} },
          },
        ],
      };

      // when
      return getComponentMetadata(component).then((serializedProps) => {
        // then
        expect(serializedProps.warnings).toEqual([]);
        expect(serializedProps.result).toEqual(expectedProps);
      });
    });

    it('serializes component implemented in JavaScript', () => {
      // given
      const component:ComponentImplementationInfo = {
        framework: 'reactjs',
        lang: 'javascript',
        path: getJavaScriptComponentPath('IntegrationCombo'),
      };
      const expectedProps:ComponentMetadata = {
        name: 'IntegrationCombo',
        properties: [
          {
            defaultValue: { value: 'Submit' },
            description: 'Description for `value` property',
            isRequired: false,
            name: 'value',
            type: { name: 'string', structure: {} },
          },
          {
            defaultValue: { value: 'secondary' },
            description: 'Select the appearance of the button',
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
      return getComponentMetadata(component).then((serializedProps) => {
        // then
        expect(serializedProps.result).toEqual(expectedProps);
        expect(serializedProps.warnings).toEqual([]);
      });
    });
  });
});
