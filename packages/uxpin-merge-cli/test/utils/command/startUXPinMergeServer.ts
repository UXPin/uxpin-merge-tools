import { ChildProcess, spawn } from 'child_process';
import { buildCommand } from './buildCommand';
import { CmdOptions } from './CmdOptions';
import { getAllCmdOptions } from './getAllCmdOptions';
import { getSpawnOptions } from './getSpawnOptions';

export interface TestServerOptions {
  onServerReady?:() => void;
  serverReadyOutput:string|RegExp;
  serverFailOutput?:string|RegExp;
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
    const kill:() => void = () => process.kill(-subprocess.pid);

    onServerOutput(subprocess, options.serverReadyOutput, () => {
      if (options.onServerReady) {
        options.onServerReady();
      }

      return resolve({
        close: kill,
        subprocess,
      });
    });

    if (options.serverFailOutput) {
      onServerOutput(subprocess, options.serverFailOutput, () => {
        kill();

        return resolve({
          close: kill,
          subprocess,
        });
      });
    }

    onClose(subprocess, Boolean(options.silent), () => null);
    onError(subprocess, (error) => {
      kill();
      reject(error);
    });
  });
}

function onServerOutput(subprocess:ChildProcess, output:string|RegExp, callback:(data:string) => void):void {
  subprocess.stdout.on('data', (data) => {
    if (data.toString().match(output)) {
      callback(data.toString());
    }
  });
}

function onError(subprocess:ChildProcess, callback:(error:any) => void):void {
  subprocess.on('error', (data) => callback(data));
}

function onClose(subprocess:ChildProcess, silent:boolean, callback:(error:any) => void):void {
  let errorOut:string = '';
  subprocess.stderr.on('data', (data) => {
    if (!silent) {
      console.error(data.toString());
    }
    errorOut += data;
  });
  subprocess.on('close', () => callback(errorOut));
}
