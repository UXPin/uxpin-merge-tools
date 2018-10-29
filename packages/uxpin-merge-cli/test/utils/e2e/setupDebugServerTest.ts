import Chromeless from 'chromeless';
import { Command } from '../../../src';
import { SERVER_SUCCESS_MESSAGE } from '../../../src/debug/server/serverConfig';
import { CmdOptions } from '../command/CmdOptions';
import { TestServerOptions } from '../command/startUXPinMergeServer';
import { keepChromelessWhileTestsRunning } from './chromeless/keepChromelessWhileTestsRunning';
import { getRandomPortNumber } from './server/getRandomPortNumber';
import { keepServerWhileTestsRunning } from './server/keepServerWhileTestsRunning';

export interface DebugServerTestSetupOptions {
  serverCmdArgs?:string[];
  debugAppPath?:string;
  projectPath:string;
  env?:CmdOptions['env'];
}

export function setupDebugServerTest(options:DebugServerTestSetupOptions,
  onChromelessReady:(c:Chromeless<any>) => void):void {

  const { projectPath, serverCmdArgs, debugAppPath, env } = options;
  const port:number = getRandomPortNumber();
  const serverCmdArgsWithPort:CmdOptions = {
    cwd: projectPath,
    env,
    params: [Command.SERVER, ...(serverCmdArgs || []), `--port=${port}`],
  };
  const serverOptions:TestServerOptions = {
    serverReadyOutput: new RegExp(SERVER_SUCCESS_MESSAGE),
  };
  keepServerWhileTestsRunning(serverCmdArgsWithPort, serverOptions);
  keepChromelessWhileTestsRunning(port, onChromelessReady, debugAppPath);
}
