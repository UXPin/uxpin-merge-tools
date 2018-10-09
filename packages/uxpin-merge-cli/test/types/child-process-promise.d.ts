// More API here: https://www.npmjs.com/package/child-process-promise

import { ExecOptions, SpawnOptions } from 'child_process';

declare module 'child-process-promise' {
  export function exec(command:string, options?:ExecOptions):Promise<CommandResult>;
  export function spawn(command:string, options?:SpawnOptions):Promise<CommandResult>;

  export interface CommandResult {
    stdout:string;
    stderr:string;
  }
}
