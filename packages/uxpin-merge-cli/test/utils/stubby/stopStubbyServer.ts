import { Stubby } from 'stubby';

export function stopStubbyServer(server: Stubby): Promise<boolean> {
  return new Promise((resolve, reject) => {
    server.stop((error: any) => {
      if (error) {
        reject(error);

        return;
      }

      resolve(true);
    });
  });
}
