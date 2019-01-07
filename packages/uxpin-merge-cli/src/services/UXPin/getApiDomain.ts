const PROTOCOL:string = 'https';
const SUBDOMAIN:string = 'api';

export function getApiDomain(mergeDomain:string):string {
  return `${PROTOCOL}://${SUBDOMAIN}.${mergeDomain}`;
}
