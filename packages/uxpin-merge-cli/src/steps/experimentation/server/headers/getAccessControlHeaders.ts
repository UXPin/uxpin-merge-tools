import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import { decorateWithAccessControlAllowOrigin } from './decorateWithAccessControlAllowOrigin';

export function getAccessControlHeaders(incomingHeaders:IncomingHttpHeaders = {}):OutgoingHttpHeaders {
  return decorateWithAccessControlAllowOrigin({
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Range',
    'Access-Control-Allow-Method': 'GET, OPTIONS, POST, PUT',
  }, incomingHeaders);
}
