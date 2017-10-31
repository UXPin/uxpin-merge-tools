import Chromeless from 'chromeless';
import { getRandomPortNumber } from '../../../../src/debug/server/getRandomPortNumber';
import { SERVER_URL } from '../../../../src/debug/server/serverConfig';
import { tapPromise } from '../../../../src/utils/promise/tapPromise';
import { createChromeless } from './createChromeless';

export function evalInBrowser<T, K extends any>(logic:(...args:K[]) => T, ...args:K[]):Promise<T> {
  const chromeless:Chromeless<any> = createChromeless(`${SERVER_URL}:${getRandomPortNumber()}`);
  return chromeless
    .evaluate(logic, ...args)
    .then(tapPromise((content:T) => chromeless.end()));
}
