import { NO_CONTENT, OK } from 'http-status-codes';

export async function parseJson<T>(response:Response):Promise<T|null> {
  if (response.status === NO_CONTENT) {
    return Promise.resolve(null);
  }

  try {
    const data:T = await response.json();

    if (response.status === OK) {
      return data;
    }

    return Promise.reject(data);
  } catch (error) {
    return Promise.reject(error);
  }
}
