import { exec, ExecOptions } from 'child_process';
import { DEFAULT_STDOUT_BUFFER_SIZE_BYTES } from '../../common/constants';

export class ExecError extends Error {
  public stdout:string | Buffer = '';
  public stderr:string | Buffer = '';
}

export function execAsync(command:string, options:ExecOptions = {}):Promise<string> {
  const execOptions:ExecOptions = {
    ...options,
    maxBuffer: options.maxBuffer || DEFAULT_STDOUT_BUFFER_SIZE_BYTES,
  };

  return new Promise((resolve, reject) => {
    exec(command, execOptions, (error:Error|null, stdout:string, stderr:string):void => {
      if (error) {
        const execError:ExecError = new ExecError(error.message);
        execError.stdout = stdout;
        execError.stderr = stderr;

        reject(execError);

        return;
      }

      resolve(stdout);
    });
  });
}
