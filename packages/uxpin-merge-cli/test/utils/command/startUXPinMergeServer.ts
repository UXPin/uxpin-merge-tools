import { ChildProcess, spawn } from 'child_process';
import { buildCommand } from './buildCommand';
import { CmdOptions } from './CmdOptions';
import { getAllCmdOptions } from './getAllCmdOptions';
import { getSpawnOptions } from './getSpawnOptions';

export interface TestServerOptions {
  serverReadyOutput:RegExp;
  silent?:boolean;
}

export interface MergeServerResponse {
  close:() => void;
  subprocess:ChildProcess;
}

export function startUXPinMergeServer(cmdOptions:CmdOptions, options:TestServerOptions):Promise<MergeServerResponse> {
  return new Promise((resolve, reject) => {
    const command:string = buildCommand(getAllCmdOptions(cmdOptions));
    const subprocess:ChildProcess = spawn(command, [], getSpawnOptions());
    onServerReady(subprocess, options.serverReadyOutput, () => {
      return resolve({
        close: () => {
          // Kill subprocess together with it's subprocesses
          process.kill(-subprocess.pid);
        },
        subprocess,
      });
    });
    onFailure(subprocess, Boolean(options.silent), (error) => reject(error));
  });
}

function onServerReady(subprocess:ChildProcess, serverReadyOutput:RegExp, onReady:() => void):void {
  subprocess.stdout.on('data', (data) => {
    if (data.toString().match(serverReadyOutput)) {
      onReady();
    }
  });
}

function onFailure(subprocess:ChildProcess, silent:boolean, callback:(error:any) => void):void {
  let errorOut:string = '';
  subprocess.stderr.on('data', (data) => {
    if (!silent) {
      console.error(data.toString());
    }
    errorOut += data;
  });
  subprocess.on('close', () => callback(errorOut));
  subprocess.on('error', (data) => callback(data));
}
