export function getApiDomain(apiDomain:string, protocol:string = 'https'):string {
  return `${protocol}://${apiDomain}`;
}
