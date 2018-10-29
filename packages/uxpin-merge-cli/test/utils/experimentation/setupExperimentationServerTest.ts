// tslint:disable no-duplicate-imports
import { DeferredChain } from 'deferred-proxy-chain';
import * as path from 'path';
import * as requestPromise from 'request-promise';
import { RequestPromise, RequestPromiseOptions } from 'request-promise';
import { URL } from 'url';
import { COMPILATION_SUCCESS_MESSAGE } from '../../../src/program/command/experimentation/getExperimentationWatchCommandSteps';
import { SERVER_READY_OUTPUT } from '../../../src/steps/experimentation/server/console/printServerReadyMessage';
import { writeToFile } from '../../../src/utils/fs/writeToFile';
import { MergeServerResponse, startUXPinMergeServer, TestServerOptions } from '../command/startUXPinMergeServer';
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

  beforeAll(async () => {
    const config:ExperimentationServerConfiguration = await getServerConfiguration(options);
    cleanupTemp = config.cleanupTemp;
    mergeServerResponse = await startUXPinMergeServer(config.cmdOptions, serverOptions);
    deferredContext.setTarget(getTestContext(config, mergeServerResponse));
  });

  afterAll(async () => {
    await mergeServerResponse.close();
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
      return new Promise((resolve, reject) => {
        const eventName:string = 'data';
        const changeListener:(data:Buffer) => void = (data) => {
          if (!data.toString().match(new RegExp(COMPILATION_SUCCESS_MESSAGE))) {
            return;
          }

          subprocess.stdout.removeListener(eventName, changeListener);
          resolve();
        };

        const stdErrorDataListener:(data:Buffer) => void = (data) => {
          subprocess.stdout.removeListener(eventName, changeListener);
          reject(data.toString());
        };

        subprocess.stdout.addListener(eventName, changeListener);
        subprocess.stderr.addListener(eventName, stdErrorDataListener);

        process.nextTick(async () => {
          try {
            await writeToFile(path.resolve(workingDir, relativeFilePath), content);
          } catch (error) {
            reject(error);
          }
        });
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
