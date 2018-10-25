import { ChildProcess, exec } from 'child_process';
import { buildCommand } from './buildCommand';
import { CmdOptions } from './CmdOptions';
import { getAllCmdOptions } from './getAllCmdOptions';
import { getExecOptions } from './getExecOptions';

export interface TestServerOptions {
  serverReadyOutput:RegExp;
}

export interface MergeServerResponse {
  close:() => void;
  subprocess:ChildProcess;
}

export function startUXPinMergeServer(cmdOptions:CmdOptions, options:TestServerOptions):Promise<MergeServerResponse> {
  return new Promise((resolve, reject) => {
    const command:string = buildCommand(getAllCmdOptions(cmdOptions));
    const subprocess:ChildProcess = exec(command, getExecOptions());
    onServerReady(subprocess, options.serverReadyOutput, () => {
      return resolve({
        close: () => subprocess.kill(),
        subprocess,
      });
    });
    onFailure(subprocess, (error) => reject(error));
  });
}

function onServerReady(subprocess:ChildProcess, serverReadyOutput:RegExp, onReady:() => void):void {
  subprocess.stdout.on('data', (data) => {
    if (data.toString().match(serverReadyOutput)) {
      onReady();
    }
  });
}

function onFailure(subprocess:ChildProcess, callback:(error:any) => void):void {
  let errorOut:string = '';
  subprocess.stderr.on('data', (data) => {
    console.error(data);
    errorOut += data;
  });
  subprocess.on('close', () => callback(errorOut));
  subprocess.on('error', (data) => callback(data));
}
