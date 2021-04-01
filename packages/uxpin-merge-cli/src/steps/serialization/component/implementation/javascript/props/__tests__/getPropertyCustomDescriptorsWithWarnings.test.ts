import { Warned } from '../../../../../../../common/warning/Warned';
import { CustomDescriptorsTags, ParsedPropertyDescriptors } from '../../../ComponentPropertyDefinition';
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
    const descriptors:Warned<ParsedPropertyDescriptors> =
      await getPropertyCustomDescriptorsWithWarnings(property);

    // then
    expect(descriptors).toEqual({
      result: { descriptors: [] },
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
    const descriptors:Warned<ParsedPropertyDescriptors> =
      await getPropertyCustomDescriptorsWithWarnings(property);

    // then
    const expected:Warned<ParsedPropertyDescriptors> = {
      result: {
        descriptors: [
          {
            serialized: { customDescription: 'Some desc' },
            type: CustomDescriptorsTags.DESCRIPTION,
          },
          {
            serialized: { customName: 'test' },
            type: CustomDescriptorsTags.NAME,
          },
        ],
      },
      warnings: [],
    };
    expect(descriptors).toEqual(expected);
  });
});
