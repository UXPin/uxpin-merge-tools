import { ExecOptions } from 'child_process';

export function getExecOptions(): ExecOptions {
  const bytesPerKByte = 1024;
  const maxStdOutBufferSizeInKB = 1000;
  return { maxBuffer: bytesPerKByte * maxStdOutBufferSizeInKB };
}
