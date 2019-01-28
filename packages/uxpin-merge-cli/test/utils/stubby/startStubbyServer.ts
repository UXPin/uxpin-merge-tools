import { Stubby, StubbyOptions } from 'stubby';

interface PortRange {
  max:number;
  min:number;
}

export const ADMIN_PORT_RANGE:PortRange = {
  max: 10999,
  min: 10000,
};

export const STUBS_PORT_RANGE:PortRange = {
  max: 11999,
  min: 11000,
};

export const TLS_PORT_RANGE:PortRange = {
  max: 12999,
  min: 12000,
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
