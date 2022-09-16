export function getApiDomain(apiDomain: string, protocol = 'https'): string {
  return `${protocol}://${apiDomain}`;
}
