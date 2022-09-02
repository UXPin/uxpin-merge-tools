import { exec, ExecOptions } from 'child_process';

export class ExecError extends Error {
  public stdout: string | Buffer = '';
  public stderr: string | Buffer = '';
}

export function execAsync(command: string, options: ExecOptions = {}): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(command, options, (error: Error | null, stdout: string, stderr: string): void => {
      if (error) {
        const execError: ExecError = new ExecError(error.message);
        execError.stdout = stdout;
        execError.stderr = stderr;

        reject(execError);

        return;
      }

      resolve(stdout);
    });
  });
}
