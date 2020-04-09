import { ComponentImplementationInfo } from '../../../../../discovery/component/ComponentInfo';
import { ComponentMetadata } from '../../../ComponentDefinition';
import { serializeTSComponent } from '../serializeTSComponent';
import { getImplementation } from './serializeTSComponent.test';

describe('serializeTSComponent-Annotations', () => {
  describe('function with bind annotation', () => {
    it('serializes correctly including bind declaration in both function and bound property', () => {
      // given
      const component:ComponentImplementationInfo = getImplementation('FunctionWithBindAnnotation');

      // when
      return serializeTSComponent(component).then((serializedProps) => {
        // then
        const expectedMetadata:ComponentMetadata = {
          name: 'FunctionWithBindAnnotation',
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
});
