import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';

export function decorateWithAccessControlAllowOrigin(
  headers:OutgoingHttpHeaders,
  { origin = '*' }:IncomingHttpHeaders,
):OutgoingHttpHeaders {
  return {
    ...headers,
    'Access-Control-Allow-Origin': origin,
  };
}
