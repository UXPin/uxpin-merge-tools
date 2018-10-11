import { buildCommand } from './buildCommand';
import { CmdOptions } from './CmdOptions';
import { getExecOptions } from './getExecOptions';
import { runCommand } from './runCommand';

export function runUXPinMergeCommand(options?:CmdOptions):Promise<string> {
  const command:string = buildCommand(options);
  return runCommand(command, getExecOptions());
}
