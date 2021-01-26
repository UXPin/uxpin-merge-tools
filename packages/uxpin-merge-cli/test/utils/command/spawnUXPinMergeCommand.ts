import { ChildProcess } from 'child_process';
import { buildCommand } from './buildCommand';
import { CmdOptions } from './CmdOptions';
import { getAllCmdOptions } from './getAllCmdOptions';
import { getExecOptions } from './getExecOptions';
import { spawnCommand } from './spawnCommand';

export function spawnUXPinMergeCommand(options:CmdOptions = {}):Promise<ChildProcess> {
  const command:string = buildCommand(getAllCmdOptions(options));
  return spawnCommand(command, getExecOptions());
}
