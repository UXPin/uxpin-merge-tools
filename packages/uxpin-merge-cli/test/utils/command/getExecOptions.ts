import { ExecOptions } from 'child_process';
import { DEFAULT_STDOUT_BUFFER_SIZE_BYTES } from '../../../src/common/constants';

export function getExecOptions(options?:Partial<ExecOptions>):ExecOptions {
  const maxBuffer:number = options && options.maxBuffer ? options.maxBuffer : DEFAULT_STDOUT_BUFFER_SIZE_BYTES;
  return { ...options, maxBuffer };
}
