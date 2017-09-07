// More API here: https://www.npmjs.com/package/child-process-promise

declare module 'child-process-promise' {
  export function exec(command:string):Promise<CommandResult>;

  export interface CommandResult {
    stdout:string;
    stderr:string;
  }
}
