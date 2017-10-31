import Chromeless from 'chromeless';
import { getRandomPortNumber } from '../../../src/debug/server/getRandomPortNumber';
import { keepChromelessWhileTestsRunning } from './chromeless/keepChromelessWhileTestsRunning';
import { keepServerWhileTestsRunning } from './server/keepServerWhileTestsRunning';

export interface DebugServerTestSetupOptions {
  serverCmdArgs?:string;
  debugAppPath?:string;
  projectPath:string;
}

export function setupDebugServerTest(options:DebugServerTestSetupOptions,
  onChromelessReady:(c:Chromeless<any>) => void):void {

  const { projectPath, serverCmdArgs, debugAppPath } = options;
  const port:number = getRandomPortNumber();
  const serverCmdArgsWithPort:string = [serverCmdArgs, `--port=${port}`].join(' ');
  keepServerWhileTestsRunning(projectPath, serverCmdArgsWithPort);
  keepChromelessWhileTestsRunning(port, onChromelessReady, debugAppPath);
}
