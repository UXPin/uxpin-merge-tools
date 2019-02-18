// tslint:disable no-duplicate-imports
import { DeferredChain } from 'deferred-proxy-chain';
import * as path from 'path';
import * as requestPromise from 'request-promise';
import { RequestPromise, RequestPromiseOptions } from 'request-promise';
import { URL } from 'url';
import { COMPILATION_SUCCESS_MESSAGE } from '../../../src/program/command/experimentation/getExperimentationWatchCommandSteps';
import { Environment } from '../../../src/program/env/Environment';
import { SERVER_READY_OUTPUT } from '../../../src/steps/experimentation/server/console/printServerReadyMessage';
import { emptyLatestCommitStub } from '../../resources/stubs/emptyLatestCommit';
import { MergeServerResponse, startUXPinMergeServer, TestServerOptions } from '../command/startUXPinMergeServer';
import { getRandomPortNumber } from '../e2e/server/getRandomPortNumber';
import { changeWatchingFileContent } from '../file/changeWatchingFileContent';
import { ADMIN_PORT_RANGE, startStubbyServer, STUBS_PORT_RANGE, TLS_PORT_RANGE } from '../stubby/startStubbyServer';
import { stopStubbyServer } from '../stubby/stopStubbyServer';
import { ExperimentationServerTestSetupOptions } from './experimentationServerTestSetupOptions';
import { ExperimentationServerConfiguration, getServerConfiguration } from './getServerConfiguration';

export interface ExperimentationServerTestContext {
  request:(uri:string, options?:RequestPromiseOptions) => RequestPromise;
  changeProjectFile:(filePath:string, content:string) => Promise<void>;

  getWorkingDir():string;
}

export function setupExperimentationServerTest(
  options:ExperimentationServerTestSetupOptions = {},
):ExperimentationServerTestContext {
  const serverOptions:TestServerOptions = { serverReadyOutput: SERVER_READY_OUTPUT, silent: options.silent };
  const deferredContext:DeferredChain<ExperimentationServerTestContext> = new DeferredChain();

  let mergeServerResponse:MergeServerResponse;
  let cleanupTemp:() => void;
  let server:any;
  let tlsPort:number;

  beforeAll(async () => {
    tlsPort = getRandomPortNumber(TLS_PORT_RANGE.min, TLS_PORT_RANGE.max);
    server = await startStubbyServer({
      admin: getRandomPortNumber(ADMIN_PORT_RANGE.min, ADMIN_PORT_RANGE.max),
      data: emptyLatestCommitStub,
      stubs: getRandomPortNumber(STUBS_PORT_RANGE.min, STUBS_PORT_RANGE.max),
      tls: tlsPort,
    });

    const config:ExperimentationServerConfiguration = await getServerConfiguration({
      ...options,
      env: {
        ...options.env,
        UXPIN_API_DOMAIN: `0.0.0.0:${tlsPort}`,
        UXPIN_ENV: Environment.TEST,
      },
    });

    cleanupTemp = config.cleanupTemp;
    mergeServerResponse = await startUXPinMergeServer(config.cmdOptions, serverOptions);
    deferredContext.setTarget(getTestContext(config, mergeServerResponse));
  });

  afterAll(async () => {
    await mergeServerResponse.close();
    await stopStubbyServer(server);
    cleanupTemp();
  });

  return deferredContext.getProxy();
}

function getTestContext(
  { port, workingDir }:ExperimentationServerConfiguration,
  { subprocess }:MergeServerResponse,
):ExperimentationServerTestContext {
  return {
    changeProjectFile(relativeFilePath:string, content:string):Promise<void> {
      return changeWatchingFileContent({
        content,
        filePath: path.resolve(workingDir, relativeFilePath),
        subprocess,
        successMatcher: COMPILATION_SUCCESS_MESSAGE,
      });
    },
    getWorkingDir():string {
      return workingDir;
    },
    request(uri:string, options:RequestPromiseOptions = {}):RequestPromise {
      const url:URL = new URL(uri, `http://localhost:${port}`);
      return requestPromise({ url, ...options });
    },
  };
}
