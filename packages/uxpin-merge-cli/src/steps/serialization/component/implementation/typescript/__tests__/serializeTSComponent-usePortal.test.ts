import { Warned } from '../../../../../../common/warning/Warned';
import { ComponentImplementationInfo } from '../../../../../discovery/component/ComponentInfo';
import { ComponentMetadata } from '../../../ComponentDefinition';
import { serializeTSComponent } from '../serializeTSComponent';
import { getImplementation } from './serializeTSComponent.test';

describe('serializeTSComponent-usePortal', () => {
  it('is serialized with `usePortal` property', async () => {
    // having
    const component: ComponentImplementationInfo = getImplementation('FunctionWithUsePortalDeclaration');
    const expectedMetadata: ComponentMetadata = {
      defaultExported: true,
      usePortal: true,
      name: 'FunctionWithUsePortalDeclaration',
      properties: [
        {
          description: '',
          isRequired: true,
          name: 'name',
          type: { name: 'string', structure: {} },
        },
      ],
      wrappers: [],
    };

    // when
    const metadata: Warned<ComponentMetadata> = await serializeTSComponent(component);
    // then
    expect(metadata.warnings).toEqual([]);
    expect(metadata.result).toEqual(expectedMetadata);
  });
});
