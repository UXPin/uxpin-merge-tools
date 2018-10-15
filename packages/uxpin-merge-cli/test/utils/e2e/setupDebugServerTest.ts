import Chromeless from 'chromeless';
import { CmdOptions } from '../command/CmdOptions';
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
    params: ['server', ...(serverCmdArgs || []), `--port=${port}`],
  };
  keepServerWhileTestsRunning(serverCmdArgsWithPort);
  keepChromelessWhileTestsRunning(port, onChromelessReady, debugAppPath);
}
