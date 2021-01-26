import { buildCommand } from './buildCommand';
import { CmdOptions } from './CmdOptions';
import { getAllCmdOptions } from './getAllCmdOptions';
import { getExecOptions } from './getExecOptions';
import { runCommand } from './runCommand';

export function runUXPinMergeCommand(options:CmdOptions = {}):Promise<string> {
  const command:string = buildCommand(getAllCmdOptions(options));
  return runCommand(command, getExecOptions());
}
