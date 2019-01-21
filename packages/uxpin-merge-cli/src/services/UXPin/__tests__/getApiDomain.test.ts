import { getApiDomain } from '../getApiDomain';

describe('getApiDomain', () => {
  it('should return valid api domain url', () => {
    // given
    const domain:string = 'uxpin.com';

    // when
    const apiDomain:string = getApiDomain(domain);

    // then
    expect(apiDomain).toEqual('https://uxpin.com');
  });

  it('should be able to specify protocol', () => {
    // given
    const domain:string = 'uxpin.com';
    const protocol:string = 'http';

    // when
    const apiDomain:string = getApiDomain(domain, protocol);

    // then
    expect(apiDomain).toEqual('http://uxpin.com');
  });
});
