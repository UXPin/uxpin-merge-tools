import { isValidDescriptor } from '../isValidDescriptor';

describe('isValidDescriptor', () => {
  it('should return true if given value is valid custom property descriptor', () => {
    // given
    // when
    const descriptor:any = '@uxpindescription';

    // then
    expect(isValidDescriptor(descriptor)).toBe(true);
  });

  it('should return false otherwise', () => {
    // given
    // when
    const descriptor:any = '@somefaketag';

    // then
    expect(isValidDescriptor(descriptor)).toBe(false);
  });
});
