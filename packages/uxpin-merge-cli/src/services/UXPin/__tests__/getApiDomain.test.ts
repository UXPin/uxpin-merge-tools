import { getApiDomain } from '../getApiDomain';

describe('getApiDomain', () => {
  it('should return valid api domain url', () => {
    // given
    const domain:string = 'uxpin.com';

    // when
    const apiDomain:string = getApiDomain(domain);

    // then
    expect(apiDomain).toEqual('https://api.uxpin.com');
  });
});
