import { ComponentPropsList } from '../../../../src/serialization/props/ComponentPropsList';
import { serializeComponentProps } from '../../../../src/serialization/props/serializeComponentProps';
import {
  getJavaScriptComponentPath,
  getTypeScriptComponentPath,
} from '../../../utils/resources/getExampleComponentPath';

describe('serializeComponentProps – integration', () => {
  describe('providing array of objects describing all properties of the component', () => {
    it('serializes component implemented in TypeScript', () => {
      // given
      const componentPath:string = getTypeScriptComponentPath('IntegrationCombo');
      const expectedProps:ComponentPropsList = [
        {
          description: '',
          isRequired: false,
          name: 'children',
          type: { name: 'node', structure: {} },
        },
        {
          description: '',
          isRequired: true,
          name: 'value',
          type: { name: 'string', structure: {} },
        },
        {
          description: '',
          isRequired: false,
          name: 'id',
          type: { name: 'number', structure: {} },
        },
      ];

      // when
      return serializeComponentProps(componentPath).then((serializedProps) => {
        // then
        expect(serializedProps).toEqual(expectedProps);
      });
    });

    it('serializes component implemented in JavaScript', () => {
      // given
      const componentPath:string = getJavaScriptComponentPath('IntegrationCombo');
      const expectedProps:ComponentPropsList = [
        {
          description: '',
          isRequired: false,
          name: 'value',
          type: { name: 'string', structure: {} },
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
      ];

      // when
      return serializeComponentProps(componentPath).then((serializedProps) => {
        // then
        expect(serializedProps).toEqual(expectedProps);
      });
    });
  });
});
