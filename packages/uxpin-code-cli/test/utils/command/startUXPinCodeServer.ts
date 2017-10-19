import { ChildProcess, exec } from 'child_process';
import { SERVER_SUCCESS_MESSAGE } from '../../../src/server/serverConfig';
import { buildCommand } from './buildCommand';
import { getExecOptions } from './getExecOptions';

export function startUXPinCodeServer(workingDir:string, opts?:string):Promise<() => void> {
  return new Promise((resolve, reject) => {
    const uxpinCommandOptions:string = ['server', opts].filter(Boolean).join(' ');
    const command:string = buildCommand(workingDir, uxpinCommandOptions);
    const subprocess:ChildProcess = exec(command, getExecOptions());
    const serverStarted:RegExp = new RegExp(SERVER_SUCCESS_MESSAGE);
    subprocess.stdout.on('data', (data) => {
      if (data.toString().match(serverStarted)) {
        resolve(() => subprocess.kill());
      }
    });
    let errorOut:string = '';
    subprocess.stderr.on('data', (data) => errorOut += data);
    subprocess.on('close', () => reject(errorOut));
    subprocess.on('error', (data) => reject(data));
  });
}
