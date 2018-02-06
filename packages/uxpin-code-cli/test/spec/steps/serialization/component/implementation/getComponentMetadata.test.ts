import { ComponentImplementationInfo } from '../../../../../../src/steps/discovery/component/ComponentInfo';
import { ComponentMetadata } from '../../../../../../src/steps/serialization/component/ComponentDefinition';
import { getComponentMetadata } from '../../../../../../src/steps/serialization/component/implementation/getComponentMetadata';
import {
  getJavaScriptComponentPath,
  getTypeScriptComponentPath,
} from '../../../../../utils/resources/getExampleComponentPath';

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
        expect(serializedProps.result).toEqual(expectedProps);
        expect(serializedProps.warnings).toEqual([]);
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
