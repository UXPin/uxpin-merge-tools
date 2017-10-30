import Chromeless from 'chromeless';
import { SERVER_URL } from '../../../src/server/serverConfig';
import { tapPromise } from '../../../src/utils/promise/tapPromise';

export function evalInBrowser<T, K extends any>(logic:(...args:K[]) => T, ...args:K[]):Promise<T> {
  const chromeless:Chromeless<any> = new Chromeless();
  const TIMEOUT:number = 200;

  return chromeless
    .goto(SERVER_URL)
    .wait(TIMEOUT)
    .evaluate(logic, ...args)
    .then(tapPromise((content:T) => chromeless.end()));
}
