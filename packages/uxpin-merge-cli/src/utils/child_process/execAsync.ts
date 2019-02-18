import { exec, ExecOptions } from 'child_process';

export function execAsync(command:string, options:ExecOptions = {}):Promise<string> {
  return new Promise((resolve, reject) => {
    exec(command, options, (error:Error|null, stdout:string):void => {
      if (error) {
        reject(error);

        return;
      }

      resolve(stdout);
    });
  });
}
