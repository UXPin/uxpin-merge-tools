import { isAbsolute, join } from 'path';
import { testDirPath } from './testDirPath';

export function resolveTestProjectPath(path: string): string {
  if (isAbsolute(path)) {
    return path;
  }
  return join(testDirPath, path);
}
