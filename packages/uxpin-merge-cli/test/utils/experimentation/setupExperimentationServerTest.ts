// tslint:disable no-duplicate-imports
import { DeferredChain } from 'deferred-proxy-chain';
import * as requestPromise from 'request-promise';
import { RequestPromise, RequestPromiseOptions } from 'request-promise';
import { URL } from 'url';
import { SERVER_READY_OUTPUT } from '../../../src/steps/experimentation/server/startExperimentationServer';
import { CmdOptions } from '../command/CmdOptions';
import { startUXPinMergeServer, TestServerOptions } from '../command/startUXPinMergeServer';
import { getRandomPortNumber } from '../e2e/server/getRandomPortNumber';

export interface ExperimentationServerTestSetupOptions {
  serverCmdArgs?:string[];
  projectPath:string;
  env?:CmdOptions['env'];
}

export interface ExperimentationServerTestContext {
  request:(uri:string, options?:RequestPromiseOptions) => RequestPromise;
}

export function setupExperimentationServerTest(
  options:ExperimentationServerTestSetupOptions,
):ExperimentationServerTestContext {
  const port:number = getRandomPortNumber();
  const serverCmdArgsWithPort:CmdOptions = getCmdOptions(options, port);
  const serverOptions:TestServerOptions = { serverReadyOutput: SERVER_READY_OUTPUT };
  const deferredContext:DeferredChain<ExperimentationServerTestContext> = new DeferredChain();

  let closeServer:() => void;

  beforeAll(async () => {
    closeServer = await startUXPinMergeServer(serverCmdArgsWithPort, serverOptions);
    deferredContext.setTarget(getTestContext(port));
  });

  afterAll(() => closeServer());

  return deferredContext.getProxy();
}

function getTestContext(port:number):ExperimentationServerTestContext {
  return {
    request(uri:string, options:RequestPromiseOptions = {}):RequestPromise {
      const url:URL = new URL(uri, `http://localhost:${port}`);
      return requestPromise({ url, ...options });
    },
  };
}

function getCmdOptions(options:ExperimentationServerTestSetupOptions, port:number):CmdOptions {
  const { projectPath, serverCmdArgs, env } = options;
  return {
    cwd: projectPath,
    env,
    params: [...(serverCmdArgs || []), `--port=${port}`],
  };
}
