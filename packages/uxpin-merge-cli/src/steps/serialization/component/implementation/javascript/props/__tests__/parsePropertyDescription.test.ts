import { CustomDescriptorsTags } from '../../../ComponentPropertyDefinition';
import { ParsedPropertyDescriptor } from '../../../ParsedPropertyDescriptor';
import { getPropertyCustomDescriptors } from '../getPropertyCustomDescriptors';

describe('getPropertyCustomDescriptors', () => {
  const propName:string = 'somePropName';

  it('should not add any custom property descriptors if not provided in description', () => {
    // given
    const desc:string = '';

    // when
    const descriptors:ParsedPropertyDescriptor[] = getPropertyCustomDescriptors(propName, desc);

    // then
    expect(descriptors).toEqual([]);
  });

  it('should parse single descriptor', () => {
    // given
    const desc:string = '@uxpinpropname test';

    // when
    const descriptors:ParsedPropertyDescriptor[] = getPropertyCustomDescriptors(propName, desc);

    // then
    const expected:ParsedPropertyDescriptor[] = [
      {
        propName,
        serialized: { customName: 'test' },
        type: CustomDescriptorsTags.NAME,
      },
    ];
    expect(descriptors).toEqual(expected);
  });

  it('should parse multiple descriptors', () => {
    // given
    const desc:string = `@uxpindescription Some desc
@uxpinpropname test`;

    // when
    const descriptors:ParsedPropertyDescriptor[] = getPropertyCustomDescriptors(propName, desc);

    // then
    const expected:ParsedPropertyDescriptor[] = [
      {
        propName,
        serialized: { customDescription: 'Some desc' },
        type: CustomDescriptorsTags.DESCRIPTION,
      },
      {
        propName,
        serialized: {
          customName: 'test',
        },
        type: CustomDescriptorsTags.NAME,
      },
    ];
    expect(descriptors).toEqual(expected);
  });

  it('should deal with multiline descriptors', () => {
    // given
    const desc:string = `@uxpindescription Multiline
awesome
description.
@uxpinpropname test`;

    // when
    const descriptors:ParsedPropertyDescriptor[] = getPropertyCustomDescriptors(propName, desc);

    // then
    const expected:ParsedPropertyDescriptor[] = [
      {
        propName,
        serialized: {
          customDescription: `Multiline
awesome
description.`,
        },
        type: CustomDescriptorsTags.DESCRIPTION,
      },
      {
        propName,
        serialized: {
          customName: 'test',
        },
        type: CustomDescriptorsTags.NAME,
      },
    ];
    expect(descriptors).toEqual(expected);
  });

  it('should trim whitespaces', () => {
    // given
    // tslint:disable-next-line:max-line-length
    const desc:string = '    @uxpindescription      Multiline\nawesome     \n\n     description.\n   			@uxpinpropname      test     ';

    // when
    const descriptors:ParsedPropertyDescriptor[] = getPropertyCustomDescriptors(propName, desc);

    // then
    const expected:ParsedPropertyDescriptor[] = [
      {
        propName, serialized: {
          customDescription: `Multiline
awesome

description.`,
        },
        type: CustomDescriptorsTags.DESCRIPTION,
      },
      {
        propName,
        serialized: {
          customName: 'test',
        },
        type: CustomDescriptorsTags.NAME,
      },
    ];
    expect(descriptors).toEqual(expected);
  });
});
