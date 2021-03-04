import { ChildProcess, ExecOptions, spawn } from 'child_process';

export function spawnCommand(command:string, options?:ExecOptions):Promise<ChildProcess> {
  return Promise.resolve(spawn(command, [], { ...options, shell: true }));
}
