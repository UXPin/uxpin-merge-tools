// tslint:disable no-duplicate-imports
import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import { DeferredChain } from 'deferred-proxy-chain';
import * as path from 'path';
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

export enum TestServerStatus {
  STARTING = 'starting',
  READY = 'ready',
  FAILED = 'failed',
}

export interface ExperimentationServerTestContext {
  axiosPromise: (url: string, options: AxiosRequestConfig) => AxiosPromise;
  changeProjectFile: (filePath: string, content: string) => Promise<void>;
  getExperimentationUrl(): string;
  getServerStatus(): TestServerStatus;
  getWorkingDir(): string;
}

interface ExperimentationServerState {
  experimentationUrl: string;
  status: TestServerStatus;
}

export function setupExperimentationServerTest(
  options: ExperimentationServerTestSetupOptions = {}
): ExperimentationServerTestContext {
  const state: ExperimentationServerState = {
    experimentationUrl: '',
    status: TestServerStatus.STARTING,
  };

  const serverOptions: TestServerOptions = {
    onServerExperimentationUrlFound: (url: string) => (state.experimentationUrl = url),
    onServerFailed: () => (state.status = TestServerStatus.FAILED),
    onServerReady: () => (state.status = TestServerStatus.READY),
    serverFailOutput: options.serverFailOutput,
    serverReadyOutput: options.serverReadyOutput || SERVER_READY_OUTPUT,
    silent: options.silent,
  };
  const deferredContext: DeferredChain<ExperimentationServerTestContext> = new DeferredChain();

  let mergeServerResponse: MergeServerResponse;
  let cleanupTemp: () => void;
  let server: any;
  let tlsPort: number;

  beforeAll(async () => {
    tlsPort = getRandomPortNumber(TLS_PORT_RANGE.min, TLS_PORT_RANGE.max);
    server = await startStubbyServer({
      admin: getRandomPortNumber(ADMIN_PORT_RANGE.min, ADMIN_PORT_RANGE.max),
      data: emptyLatestCommitStub,
      stubs: getRandomPortNumber(STUBS_PORT_RANGE.min, STUBS_PORT_RANGE.max),
      tls: tlsPort,
    });

    const config: ExperimentationServerConfiguration = await getServerConfiguration({
      ...options,
      env: {
        ...options.env,
        UXPIN_API_DOMAIN: `0.0.0.0:${tlsPort}`,
        UXPIN_ENV: Environment.TEST,
      },
    });

    cleanupTemp = config.cleanupTemp;
    mergeServerResponse = await startUXPinMergeServer(config.cmdOptions, serverOptions);
    deferredContext.setTarget(getTestContext(config, mergeServerResponse, state));
  }, options.timeout);

  afterAll(async () => {
    await mergeServerResponse.close();
    await stopStubbyServer(server);
    cleanupTemp();
  });

  return deferredContext.getProxy();
}

function getTestContext(
  { port, workingDir }: ExperimentationServerConfiguration,
  { subprocess }: MergeServerResponse,
  { experimentationUrl, status }: ExperimentationServerState
): ExperimentationServerTestContext {
  return {
    changeProjectFile(relativeFilePath: string, content: string): Promise<void> {
      return changeWatchingFileContent({
        content,
        filePath: path.resolve(workingDir, relativeFilePath),
        subprocess,
        successMatcher: COMPILATION_SUCCESS_MESSAGE,
      });
    },
    getExperimentationUrl(): string {
      return experimentationUrl;
    },
    getServerStatus(): TestServerStatus {
      return status;
    },
    getWorkingDir(): string {
      return workingDir;
    },
    axiosPromise(url: string, options: AxiosRequestConfig): AxiosPromise {
      options.url = `http://localhost:${port}${url}`;
      return axios(options);
    },
  };
}
