import Chromeless from 'chromeless';

export function createChromeless<T>(url: string, path = '/'): Chromeless<T> {
  return new Chromeless<T>({
    remote: false,
  }).goto(`${url}${path}`);
}
