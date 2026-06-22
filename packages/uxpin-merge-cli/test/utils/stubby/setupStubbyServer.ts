import { DeferredChain } from 'deferred-proxy-chain';
import { Stubby, StubbyStub } from 'stubby';
import { getFreePort } from './getFreePort';
import { startStubbyServer } from './startStubbyServer';
import { stopStubbyServer } from './stopStubbyServer';

export interface StubbyServerContext {
  getAdminPort(): number;
  getServer(): Stubby;
  getStubsPort(): number;
  getTlsPort(): number;
}

export function setupStubbyServer(data: StubbyStub[], timeout?: number): StubbyServerContext {
  const deferredContext: DeferredChain<StubbyServerContext> = new DeferredChain();

  let tlsPort: number;
  let adminPort: number;
  let stubsPort: number;
  let server: Stubby;

  beforeAll(async () => {
    [adminPort, stubsPort, tlsPort] = await Promise.all([getFreePort(), getFreePort(), getFreePort()]);

    server = await startStubbyServer({
      admin: adminPort,
      data,
      stubs: stubsPort,
      tls: tlsPort,
    });

    deferredContext.setTarget(getContext(adminPort, server, stubsPort, tlsPort));
  }, timeout);

  afterAll(async () => {
    await stopStubbyServer(server);
  });

  return deferredContext.getProxy();
}

function getContext(adminPort: number, server: Stubby, stubsPort: number, tlsPort: number): StubbyServerContext {
  return {
    getAdminPort: () => adminPort,
    getServer: () => server,
    getStubsPort: () => stubsPort,
    getTlsPort: () => tlsPort,
  };
}
