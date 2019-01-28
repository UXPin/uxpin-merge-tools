import { Stubby, StubbyOptions } from 'stubby';

interface PortRange {
  min:number;
  max:number;
}

export const ADMIN_PORT_RANGE:PortRange = {
  min: 10000,
  max: 10999,
};

export const STUBS_PORT_RANGE:PortRange = {
  min: 11000,
  max: 11999,
};

export const TLS_PORT_RANGE:PortRange = {
  min: 12000,
  max: 12999,
};

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
