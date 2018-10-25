// tslint:disable no-duplicate-imports
import { DeferredChain } from 'deferred-proxy-chain';
import { close, open, write } from 'fs-extra';
import * as requestPromise from 'request-promise';
import { RequestPromise, RequestPromiseOptions } from 'request-promise';
import { URL } from 'url';
import { COMPILATION_SUCCESS_MESSAGE } from '../../../src/program/command/experimentation/getExperimentationWatchCommandSteps';
import { SERVER_READY_OUTPUT } from '../../../src/steps/experimentation/server/console/printServerReadyMessage';
import { CmdOptions } from '../command/CmdOptions';
import { MergeServerResponse, startUXPinMergeServer, TestServerOptions } from '../command/startUXPinMergeServer';
import { getRandomPortNumber } from '../e2e/server/getRandomPortNumber';

export interface ExperimentationServerTestSetupOptions {
  serverCmdArgs?:string[];
  projectPath:string;
  env?:CmdOptions['env'];
  port?:number;
}

export interface ExperimentationServerTestContext {
  changeFileContent:(filePath:string, content:string) => Promise<void>;
  request:(uri:string, options?:RequestPromiseOptions) => RequestPromise;
}

export function setupExperimentationServerTest(
  options:ExperimentationServerTestSetupOptions,
):ExperimentationServerTestContext {
  const port:number = options.port || getRandomPortNumber();
  const serverCmdArgsWithPort:CmdOptions = getCmdOptions(options, port);
  const serverOptions:TestServerOptions = { serverReadyOutput: SERVER_READY_OUTPUT };
  const deferredContext:DeferredChain<ExperimentationServerTestContext> = new DeferredChain();

  let mergeServerResponse:MergeServerResponse;

  beforeAll(async () => {
    mergeServerResponse = await startUXPinMergeServer(serverCmdArgsWithPort, serverOptions);
    deferredContext.setTarget(getTestContext(port, mergeServerResponse));
  });

  afterAll(() => mergeServerResponse.close());

  return deferredContext.getProxy();
}

function getTestContext(port:number, mergeServerResponse:MergeServerResponse):ExperimentationServerTestContext {
  return {
    changeFileContent(filePath:string, content:string):Promise<void> {
      return new Promise(async (resolve, reject) => {
        const eventName:string = 'data';
        const changeListener:(data:Buffer) => void = (data) => {
          if (!data.toString().match(new RegExp(COMPILATION_SUCCESS_MESSAGE))) {
            return;
          }

          mergeServerResponse.subprocess.stdout.removeListener(eventName, changeListener);
          resolve();
        };

        try {
          const fd:number = await open(filePath, 'w');
          mergeServerResponse.subprocess.stdout.addListener(eventName, changeListener);
          await write(fd, content, 0);
          await close(fd);
        } catch (error) {
          reject(error);
        }
      });
    },
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
