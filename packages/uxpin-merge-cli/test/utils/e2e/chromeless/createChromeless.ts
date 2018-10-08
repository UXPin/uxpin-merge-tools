import Chromeless from 'chromeless';

export function createChromeless<T>(url:string, path:string = '/'):Chromeless<T> {
  return new Chromeless<T>({
    remote: !!process.env.CI,
  })
    .goto(`${url}${path}`);
}
