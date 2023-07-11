import { Warned } from '../../../../../../common/warning/Warned';
import { ComponentImplementationInfo } from '../../../../../discovery/component/ComponentInfo';
import { ComponentMetadata } from '../../../ComponentDefinition';
import { serializeTSComponent } from '../serializeTSComponent';
import { getImplementation } from './utils/getImplementation';


describe('serializeTSComponent-usePortal', () => {
  it('is serialized with `usePortal` property set to the boolean `true`', async () => {
    // having
    const component: ComponentImplementationInfo = getImplementation('FunctionWithUsePortalDeclarationBoolean');
    const expectedMetadata: ComponentMetadata = {
      defaultExported: true,
      usePortal: true,
      name: 'FunctionWithUsePortalDeclarationBoolean',
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
  it('is serialized with `usePortal` property set to a string', async () => {
    // having
    const component: ComponentImplementationInfo = getImplementation('FunctionWithUsePortalDeclarationString');
    const expectedMetadata: ComponentMetadata = {
      defaultExported: true,
      usePortal: `props.mode === "modal"`,
      name: 'FunctionWithUsePortalDeclarationString',
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
