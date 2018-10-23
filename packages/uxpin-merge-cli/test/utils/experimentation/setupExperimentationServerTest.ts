// tslint:disable no-duplicate-imports
import { DeferredChain } from 'deferred-proxy-chain';
import { noop } from 'lodash';
import * as requestPromise from 'request-promise';
import { RequestPromise, RequestPromiseOptions } from 'request-promise';
import { DirectoryResult } from 'tmp-promise';
import { URL } from 'url';
import { SERVER_READY_OUTPUT } from '../../../src/steps/experimentation/server/console/printServerReadyMessage';
import { CmdOptions } from '../command/CmdOptions';
import { startUXPinMergeServer, TestServerOptions } from '../command/startUXPinMergeServer';
import { getRandomPortNumber } from '../e2e/server/getRandomPortNumber';
import { prepareTempDir } from '../temp/prepareTempDir';

export interface ExperimentationServerTestSetupOptions {
  serverCmdArgs?:string[];
  projectPath:string;
  env?:CmdOptions['env'];
  port?:number;
  useTempDir?:boolean;
}

export interface ExperimentationServerConfiguration {
  cmdOptions:CmdOptions;
  port:number;
  workingDir:string;
  cleanupTemp:() => void;
}

export interface ExperimentationServerTestContext {
  request:(uri:string, options?:RequestPromiseOptions) => RequestPromise;

  getWorkingDir():string;
}

export function setupExperimentationServerTest(
  options:ExperimentationServerTestSetupOptions,
):ExperimentationServerTestContext {
  const serverOptions:TestServerOptions = { serverReadyOutput: SERVER_READY_OUTPUT };
  const deferredContext:DeferredChain<ExperimentationServerTestContext> = new DeferredChain();

  let closeServer:() => void;
  let cleanupTemp:() => void;

  beforeAll(async () => {
    const config:ExperimentationServerConfiguration = await getServerConfiguration(options);
    cleanupTemp = config.cleanupTemp;
    closeServer = await startUXPinMergeServer(config.cmdOptions, serverOptions);
    deferredContext.setTarget(getTestContext(config));
  });

  afterAll(() => {
    closeServer();
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

async function getServerConfiguration(
  options:ExperimentationServerTestSetupOptions,
):Promise<ExperimentationServerConfiguration> {
  const port:number = options.port || getRandomPortNumber();
  let workingDir:string = options.projectPath;
  let cleanupTemp:() => void = noop;
  if (options.useTempDir) {
    const tempDir:DirectoryResult = await prepareTempDir(options.projectPath);
    workingDir = tempDir.path;
    cleanupTemp = tempDir.cleanup;
  }
  return {
    cleanupTemp,
    cmdOptions: {
      cwd: workingDir,
      env: options.env,
      params: [...(options.serverCmdArgs || []), `--port=${port}`],
    },
    port,
    workingDir,
  };
}
