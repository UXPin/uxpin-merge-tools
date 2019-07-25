import { Warned } from '../../../../../../common/warning/Warned';
import { ComponentImplementationInfo } from '../../../../../discovery/component/ComponentInfo';
import { ComponentMetadata } from '../../../ComponentDefinition';
import { ComponentWrapperType } from '../../../wrappers/ComponentWrapper';
import { serializeTSComponent } from '../serializeTSComponent';
import { getImplementation } from './serializeTSComponent.test';

describe('serializeTSComponent-Wrappers', () => {
  describe('when class component is provided', () => {
    it('serializes correctly with provided wrappers', async () => {
      // having
      const component:ComponentImplementationInfo = getImplementation('ClassWithWrappersDeclaration');
      const expectedMetadata:ComponentMetadata = {
        name: 'ClassWithWrappersDeclaration',
        properties: [
          {
            description: '',
            isRequired: true,
            name: 'name',
            type: { name: 'string', structure: {} },
          },
        ],
        wrappers: [
          {
            name: 'NonResizableWrapper',
            type: ComponentWrapperType.BUILT_IN,
          },
          {
            name: 'SkipContainerWrapper',
            type: ComponentWrapperType.BUILT_IN,
          },
        ],
      };

      // when
      const metadata:Warned<ComponentMetadata> = await serializeTSComponent(component);

      // then
      expect(metadata.warnings).toEqual([]);
      expect(metadata.result).toEqual(expectedMetadata);
    });
  });
});
