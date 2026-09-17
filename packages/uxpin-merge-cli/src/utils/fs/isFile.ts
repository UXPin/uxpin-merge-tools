import { pathExists } from '../../common/fs/projectFs';
import { isFileCaseSensitive } from './isFile/isFileCaseSensitive';

const defaults: IsFileOptions = {
  caseSensitive: false,
};

interface IsFileOptions {
  caseSensitive?: boolean;
}

export function isFile(path: string, options: IsFileOptions = {}): Promise<boolean> {
  const { caseSensitive }: IsFileOptions = { ...defaults, ...options };
  if (caseSensitive) {
    return isFileCaseSensitive(path);
  }
  return pathExists(path);
}
