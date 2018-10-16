import { SERVER_READY_OUTPUT } from '../../../src/steps/experimentation/server/startExperimentationServer';
import { CmdOptions } from '../command/CmdOptions';
import { getRandomPortNumber } from '../e2e/server/getRandomPortNumber';
import { keepServerWhileTestsRunning } from '../e2e/server/keepServerWhileTestsRunning';

export interface ExperimentationServerTestSetupOptions {
  serverCmdArgs?:string[];
  projectPath:string;
  env?:CmdOptions['env'];
}

export function setupExperimentationServerTest(options:ExperimentationServerTestSetupOptions):void {
  const { projectPath, serverCmdArgs, env } = options;
  const port:number = getRandomPortNumber();
  const serverCmdArgsWithPort:CmdOptions = {
    cwd: projectPath,
    env,
    params: [...(serverCmdArgs || []), `--port=${port}`],
  };
  keepServerWhileTestsRunning(serverCmdArgsWithPort, { serverReadyOutput: SERVER_READY_OUTPUT });
}
