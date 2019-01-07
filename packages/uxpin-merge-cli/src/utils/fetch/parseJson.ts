const HTTP_OK:number = 200;
const HTTP_NO_CONTENT:number = 204;

export async function parseJson<T>(response:Response):Promise<T|null> {
  if (response.status === HTTP_NO_CONTENT) {
    return Promise.resolve(null);
  }

  try {
    const data:T = await response.json();

    if (response.status === HTTP_OK) {
      return data;
    }

    return Promise.reject(data);
  } catch (error) {
    return Promise.reject(error);
  }
}
