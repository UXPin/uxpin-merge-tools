import { CustomDescriptorsTags } from '../../../../implementation/ComponentPropertyDefinition';
import { parseNameTag } from '../parseNameTag';

describe('parseNameTag', () => {
  it('should return valid custom name', () => {
    // having
    const value = 'foo';

    // when
    // then
    expect(parseNameTag(value)).toEqual({
      serialized: { customName: 'foo' },
      type: CustomDescriptorsTags.NAME,
    });
  });

  it('should trim whitespaces', () => {
    // having
    // tslint:disable:no-trailing-whitespace
    const value = `
    foo`;
    // tslint:enable:no-trailing-whitespace

    // when
    // then
    expect(parseNameTag(value)).toEqual({
      serialized: { customName: 'foo' },
      type: CustomDescriptorsTags.NAME,
    });
  });

  it('should return empty object if name is not provided', () => {
    // having
    const value = `

`;

    // when
    // then
    expect(parseNameTag(value)).toEqual(undefined);
  });
});
