// tslint:disable no-duplicate-imports
import { DeferredChain } from 'deferred-proxy-chain';
import * as requestPromise from 'request-promise';
import { RequestPromise, RequestPromiseOptions } from 'request-promise';
import { URL } from 'url';
import { SERVER_READY_OUTPUT } from '../../../src/steps/experimentation/server/console/printServerReadyMessage';
import { startUXPinMergeServer, TestServerOptions } from '../command/startUXPinMergeServer';
import { ExperimentationServerTestSetupOptions } from './experimentationServerTestSetupOptions';
import { ExperimentationServerConfiguration, getServerConfiguration } from './getServerConfiguration';

export interface ExperimentationServerTestContext {
  request:(uri:string, options?:RequestPromiseOptions) => RequestPromise;

  getWorkingDir():string;
}

export function setupExperimentationServerTest(
  options:ExperimentationServerTestSetupOptions = {},
):ExperimentationServerTestContext {
  const serverOptions:TestServerOptions = { serverReadyOutput: SERVER_READY_OUTPUT };
  const deferredContext:DeferredChain<ExperimentationServerTestContext> = new DeferredChain();

  let closeServer:() => Promise<void>;
  let cleanupTemp:() => void;

  beforeAll(async () => {
    const config:ExperimentationServerConfiguration = await getServerConfiguration(options);
    cleanupTemp = config.cleanupTemp;
    closeServer = await startUXPinMergeServer(config.cmdOptions, serverOptions);
    deferredContext.setTarget(getTestContext(config));
  });

  afterAll(async () => {
    await closeServer();
    cleanupTemp();
  });

  return deferredContext.getProxy();
}

function getTestContext({ port, workingDir }:ExperimentationServerConfiguration):ExperimentationServerTestContext {
  return {
    request(uri:string, options:RequestPromiseOptions = {}):RequestPromise {
      const url:URL = new URL(uri, `http://localhost:${port}`);
      return requestPromise({ url, ...options });
    },
    getWorkingDir():string {
      return workingDir;
    },
  };
}
