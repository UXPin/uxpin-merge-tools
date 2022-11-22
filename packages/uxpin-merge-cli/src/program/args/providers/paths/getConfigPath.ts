import { resolve } from 'path';
import { ProgramArgs } from '../../ProgramArgs';

interface ConfigParams {
  cwd?: string;
  config?: string;
}

export function getConfigPath({ cwd, config }: ConfigParams): string {
  if (!cwd) {
    return '';
  }

  return resolve(cwd, config || '');
}
