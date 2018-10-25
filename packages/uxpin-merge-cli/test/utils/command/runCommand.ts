import { exec } from 'child-process-promise';
import { ExecOptions } from 'child_process';

export function runCommand(command:string, options?:ExecOptions):Promise<string> {
  return exec(command, options).then((result) => {
    return result.stdout;
  }).catch((err) => {
    throw err.toString();
  });
}
