import { getNgrokSessionId } from '../getNgrokSessionId';

describe('getNgrokSessionId', () => {
  it('should return session id when correct url is provided', () => {
    // given
    const url:string = 'https://d8bbcb13.ngrok.io';

    // when
    const sessionId:string | undefined = getNgrokSessionId(url);

    // then
    expect(sessionId).toEqual('d8bbcb13');
  });

  it('should return undefined if it cant extract session id from url', () => {
    // given
    const url:string = '';

    // when
    const sessionId:string | undefined = getNgrokSessionId(url);

    // then
    expect(sessionId).toBeUndefined();
  });

  it('should return undefined when URL is not provided', () => {
    // given
    // when
    const sessionId:string | undefined = getNgrokSessionId();

    // then
    expect(sessionId).toBeUndefined();
  });
});
