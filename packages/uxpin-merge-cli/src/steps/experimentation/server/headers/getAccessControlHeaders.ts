import { getUXPinAppUrl } from './getUXPinAppUrl';

export function getAccessControlHeaders(uxpinDomain:string):any {
  return {
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Range',
    'Access-Control-Allow-Origin': getUXPinAppUrl(uxpinDomain),
  };
}
