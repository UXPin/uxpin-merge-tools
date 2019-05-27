import { Warned } from '../../../../../../../common/warning/Warned';
import { ComponentPropertyCustomDescriptors } from '../../../ComponentPropertyDefinition';
import { GeneralPropItem } from '../../FlowPropItem';
import { getPropertyCustomDescriptorsWithWarnings } from '../getPropertyCustomDescriptorsWithWarnings';

describe('getPropertyCustomDescriptorsWithWarnings', () => {
  it('should not add any custom property descriptors if not provided in description', async () => {
    // given
    const property:GeneralPropItem = {
      defaultValue: '',
      description: '',
      required: false,
      type: { name: 'string', structure: {} },
    };

    // when
    const descriptors:Warned<ComponentPropertyCustomDescriptors> =
      await getPropertyCustomDescriptorsWithWarnings('name', property);

    // then
    expect(descriptors).toEqual({
      result: {},
      warnings: [],
    });
  });

  it('should parse multiple descriptors', async () => {
    // given
    const property:GeneralPropItem = {
      defaultValue: '',
      description: `@uxpindescription Some desc
@uxpinpropname test`,
      required: false,
      type: { name: 'string', structure: {} },
    };

    // when
    const descriptors:Warned<ComponentPropertyCustomDescriptors> =
      await getPropertyCustomDescriptorsWithWarnings('name', property);

    // then
    expect(descriptors).toEqual({
      result: {
        customDescription: 'Some desc',
        customName: 'test',
      },
      warnings: [],
    } as Warned<ComponentPropertyCustomDescriptors>);
  });
});
