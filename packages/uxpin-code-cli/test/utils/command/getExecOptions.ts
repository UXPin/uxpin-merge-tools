import { ExecOptions } from 'child_process';

export function getExecOptions():ExecOptions {
  const bytesPerKByte:number = 1024;
  const maxStdOutBufferSizeInKB:number = 500;
  return { maxBuffer: bytesPerKByte * maxStdOutBufferSizeInKB };
}
