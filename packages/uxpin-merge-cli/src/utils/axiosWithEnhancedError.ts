import axios , { AxiosError, AxiosPromise, AxiosRequestConfig } from 'axios';

export function axiosWithEnhancedError(options:AxiosRequestConfig):AxiosPromise {
  return axios(options).catch((error:AxiosError) => {
    if (error.response) {
      throw {
        ...error.response.data,
        url: options.url,
      };
    } else {
      throw error;
    }
  });
}
