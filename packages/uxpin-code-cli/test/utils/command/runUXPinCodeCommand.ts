import { buildCommand } from './buildCommand';
import { getExecOptions } from './getExecOptions';
import { runCommand } from './runCommand';

export function runUXPinCodeCommand(workingDir:string, options?:string):Promise<string> {
  const command:string = buildCommand(workingDir, options);
  return runCommand(command, getExecOptions());
}
