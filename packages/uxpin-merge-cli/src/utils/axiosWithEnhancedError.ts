import axios , { AxiosError, AxiosPromise, AxiosRequestConfig } from 'axios';

export function axiosWithEnhancedError(options:AxiosRequestConfig):AxiosPromise {
  return axios(options).catch((error:AxiosError) => {
    throw {
      message: error.message,
      url: options.url,
    };
  });
}
