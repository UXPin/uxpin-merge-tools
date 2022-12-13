import { resolve } from 'path';

export function getConfigPath({ cwd, config }: { cwd:string | undefined, config: string | undefined }):string {
  if (!cwd) {
    return '';
  }
  return resolve(cwd, config || '');
}
