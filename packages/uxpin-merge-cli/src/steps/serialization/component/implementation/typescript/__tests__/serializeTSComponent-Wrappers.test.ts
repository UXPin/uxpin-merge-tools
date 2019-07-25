import { Warned } from '../../../../../../common/warning/Warned';
import { ComponentImplementationInfo } from '../../../../../discovery/component/ComponentInfo';
import { ComponentMetadata } from '../../../ComponentDefinition';
import { ComponentWrapperType } from '../../../wrappers/ComponentWrapper';
import { serializeTSComponent } from '../serializeTSComponent';
import { getImplementation } from './serializeTSComponent.test';

describe.only('serializeTSComponent-Wrappers', () => {
  describe('when class component with valid wrappers declaration is provided', () => {
    let component:ComponentImplementationInfo;
    let metadata:Warned<ComponentMetadata>;

    beforeEach(async () => {
      component = getImplementation('ClassWithWrappersDeclaration');
      metadata = await serializeTSComponent(component);
    });

    it('serializes metadata correctly', () => {
      // having
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
      // then
      expect(metadata.result).toEqual(expectedMetadata);
    });

    it('gives no warnings', () => {
      expect(metadata.warnings).toEqual([]);
    });
  });

  describe('when class component with invalid wrappers declaration is provided', () => {
    let component:ComponentImplementationInfo;
    let metadata:Warned<ComponentMetadata>;

    beforeEach(async () => {
      component = getImplementation('ClassWithInvalidWrappersDeclaration');
      metadata = await serializeTSComponent(component);
    });

    it('serializes metadata correctly', () => {
      // having
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
        ],
      };

      // when
      // then
      expect(metadata.result).toEqual(expectedMetadata);
    });

    it('gives warning with information about invalid wrapper path', () => {
      expect(metadata.warnings).toEqual([
        {
          message: 'Invalid wrapper path',
        },
      ]);
    });
  });
});
