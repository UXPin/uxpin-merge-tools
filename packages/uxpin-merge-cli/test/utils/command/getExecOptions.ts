import { ExecOptions } from 'child_process';

export function getExecOptions():ExecOptions {
  const bytesPerKByte:number = 1024;
  const maxStdOutBufferSizeInKB:number = 1000;
  return { maxBuffer: bytesPerKByte * maxStdOutBufferSizeInKB };
}
