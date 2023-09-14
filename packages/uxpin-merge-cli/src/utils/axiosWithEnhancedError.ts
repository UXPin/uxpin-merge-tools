import axios, { AxiosError, AxiosPromise, AxiosRequestConfig } from 'axios';
import debug from 'debug';

const log = debug('uxpin:http');

export async function axiosWithEnhancedError(options: AxiosRequestConfig): AxiosPromise {
  log((options.method || 'GET').toUpperCase(), options.url);
  try {
    const result = await axios(options);
    log(result.status + ' ' + result.statusText);
    return result;
  } catch (error) {
    if ((error as AxiosError).response) {
      throw {
        ...((error as AxiosError)?.response?.data as any),
        url: options.url,
      };
    } else {
      throw error;
    }
  }
}
