import { CoreOptions } from 'request';
import { RequestPromise } from 'request-promise';
import requestPromise = require('request-promise');

export function requestPromiseWithEnhancedError(url:string, options:CoreOptions):RequestPromise {
  return requestPromise(url, options).catch((error) => {
    throw {
      ...error.error,
      url,
    };
  }) as any;
}
