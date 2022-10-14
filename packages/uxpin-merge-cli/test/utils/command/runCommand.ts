import { ExecOptions } from 'child_process';
import { execAsync } from '../../../src/utils/child_process/execAsync';

export function runCommand(command: string, options?: ExecOptions): Promise<string> {
  return execAsync(command, options);
}
