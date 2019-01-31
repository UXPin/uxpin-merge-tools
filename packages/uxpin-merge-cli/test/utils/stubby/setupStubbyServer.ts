import { Stubby, StubbyStub } from 'stubby';
import { getRandomPortNumber } from '../e2e/server/getRandomPortNumber';
import { ADMIN_PORT_RANGE, STUBS_PORT_RANGE, TLS_PORT_RANGE, startStubbyServer } from './startStubbyServer';
import { stopStubbyServer } from './stopStubbyServer';
import { DeferredChain } from 'deferred-proxy-chain';

export interface StubbyServerContext {
  getAdminPort():number;
  getServer():Stubby;
  getStubsPort():number;
  getTlsPort():number;
}

export function setupStubbyServer(data:StubbyStub[]):StubbyServerContext {
  const deferredContext:DeferredChain<StubbyServerContext> = new DeferredChain();

  let tlsPort:number;
  let adminPort:number;
  let stubsPort:number;
  let server:Stubby;

  beforeAll(async () => {
    adminPort = getRandomPortNumber(ADMIN_PORT_RANGE.min, ADMIN_PORT_RANGE.max);
    stubsPort = getRandomPortNumber(STUBS_PORT_RANGE.min, STUBS_PORT_RANGE.max);
    tlsPort = getRandomPortNumber(TLS_PORT_RANGE.min, TLS_PORT_RANGE.max);

    server = await startStubbyServer({
      admin: adminPort,
      data,
      stubs: stubsPort,
      tls: tlsPort,
    });

    deferredContext.setTarget(getContext(adminPort, server, stubsPort, tlsPort));
  });

  afterAll(async () => {
    await stopStubbyServer(server);
  });

  return deferredContext.getProxy();
}

function getContext(adminPort:number, server:Stubby, stubsPort:number, tlsPort:number):StubbyServerContext {
  return {
    getAdminPort: () => adminPort,
    getServer: () => server,
    getStubsPort: () => stubsPort,
    getTlsPort: () =>  tlsPort,
  };
}
