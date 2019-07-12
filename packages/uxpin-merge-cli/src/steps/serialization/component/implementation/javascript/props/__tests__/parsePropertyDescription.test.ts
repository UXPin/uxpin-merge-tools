import { ComponentPropertyCustomDescriptors } from '../../../ComponentPropertyDefinition';
import { getPropertyCustomDescriptors } from '../getPropertyCustomDescriptors';

describe('getPropertyCustomDescriptors', () => {
  it('should not add any custom property descriptors if not provided in description', () => {
    // given
    const desc:string = '';

    // when
    const descriptors:ComponentPropertyCustomDescriptors = getPropertyCustomDescriptors(desc);

    // then
    expect(descriptors).toEqual({});
  });

  it('should parse single descriptor', () => {
    // given
    const desc:string = '@uxpinpropname test';

    // when
    const descriptors:ComponentPropertyCustomDescriptors = getPropertyCustomDescriptors(desc);

    // then
    expect(descriptors).toEqual({
      customName: 'test',
    });
  });

  it('should parse multiple descriptors', () => {
    // given
    const desc:string = `@uxpindescription Some desc
@uxpinpropname test`;

    // when
    const descriptors:ComponentPropertyCustomDescriptors = getPropertyCustomDescriptors(desc);

    // then
    expect(descriptors).toEqual({
      customDescription: 'Some desc',
      customName: 'test',
    });
  });

  it('should deal with multiline descriptors', () => {
    // given
    const desc:string = `@uxpindescription Multiline
awesome
description.
@uxpinpropname test`;

    // when
    const descriptors:ComponentPropertyCustomDescriptors = getPropertyCustomDescriptors(desc);

    // then
    expect(descriptors).toEqual({
      customDescription: `Multiline
awesome
description.`,
      customName: 'test',
    });
  });

  it('should trim whitespaces', () => {
    // given
    // tslint:disable:no-trailing-whitespace
    const desc:string = `    @uxpindescription      Multiline
awesome     

     description.
   			@uxpinpropname      test     `;
    // tslint:enable:no-trailing-whitespace

    // when
    const descriptors:ComponentPropertyCustomDescriptors = getPropertyCustomDescriptors(desc);

    // then
    expect(descriptors).toEqual({
      customDescription: `Multiline
awesome

description.`,
      customName: 'test',
    });
  });
});
