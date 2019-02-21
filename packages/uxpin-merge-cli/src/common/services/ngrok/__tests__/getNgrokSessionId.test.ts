import { getNgrokSessionId } from '../getNgrokSessionId';

describe('getNgrokSessionId', () => {
  it('should return session id when correct url is provided', () => {
    // given
    const url:string = 'https://d8bbcb13.ngrok.io';

    // when
    const sessionId:string|null = getNgrokSessionId(url);

    // then
    expect(sessionId).toEqual('d8bbcb13');
  });

  it('should return null if it cant extract session id from url', () => {
    // given
    const url:string = '';

    // when
    const sessionId:string|null = getNgrokSessionId(url);

    // then
    expect(sessionId).toBeNull();
  });
});
