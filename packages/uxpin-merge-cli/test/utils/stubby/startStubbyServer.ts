import * as fs from 'fs';
import * as path from 'path';
import { Stubby, StubbyOptions } from 'stubby';

const TLS_DIR = path.resolve(__dirname, '../../resources/tls');
const TLS_KEY = fs.readFileSync(path.join(TLS_DIR, 'key.pem'), 'utf8');
const TLS_CERT = fs.readFileSync(path.join(TLS_DIR, 'cert.pem'), 'utf8');

interface PortRange {
  max: number;
  min: number;
}

export const ADMIN_PORT_RANGE: PortRange = {
  max: 10999,
  min: 10000,
};

export const STUBS_PORT_RANGE: PortRange = {
  max: 11999,
  min: 11000,
};

export const TLS_PORT_RANGE: PortRange = {
  max: 12999,
  min: 12000,
};

export function startStubbyServer(options: StubbyOptions): Promise<Stubby> {
  return new Promise((resolve, reject) => {
    const server: Stubby = new Stubby();

    server.start({ key: TLS_KEY, cert: TLS_CERT, ...options }, (error: any) => {
      if (error) {
        reject(error);

        return;
      }

      resolve(server);
    });
  });
}
