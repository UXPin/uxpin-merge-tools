import { parseNameTag } from '../parseNameTag';

describe('parseNameTag', () => {
  it('should return valid custom name', () => {
    // having
    const value:string = 'foo';

    // when
    // then
    expect(parseNameTag(value)).toEqual({ customName: 'foo' });
  });

  it('should trim whitespaces', () => {
    // having
    // tslint:disable:no-trailing-whitespace
    const value:string = `     
    foo`;
    // tslint:enable:no-trailing-whitespace

    // when
    // then
    expect(parseNameTag(value)).toEqual({ customName: 'foo' });
  });

  it('should return empty object if name is not provided', () => {
    // having
    const value:string = `

`;

    // when
    // then
    expect(parseNameTag(value)).toEqual(undefined);
  });
});
