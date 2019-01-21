import { Stubby, StubbyOptions } from 'stubby';

export function startStubbyServer(options:StubbyOptions):Promise<Stubby> {
  return new Promise((resolve, reject) => {
    const server:Stubby = new Stubby();

    server.start(options, (error:any) => {
      if (error) {
        reject(error);

        return;
      }

      resolve(server);
    });
  });
}
