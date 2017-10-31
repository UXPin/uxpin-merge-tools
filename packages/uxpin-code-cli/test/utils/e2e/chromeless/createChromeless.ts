import Chromeless from 'chromeless';

const TIMEOUT:number = 5000;

export function createChromeless<T>(url:string, path:string = '/'):Chromeless<T> {
  return new Chromeless<T>({ remote: !!process.env.CI })
    .goto(`${url}${path}`)
    .wait(TIMEOUT);
}
