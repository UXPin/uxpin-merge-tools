import { parse } from 'path';
import { isBuiltInWrapper } from './isBuiltInWrapper';

const PREFIX = 'Custom';

export function getWrapperNameFromPath(path: string): string {
  const { name } = parse(path);

  if (isBuiltInWrapper(name)) {
    return `${PREFIX}${name}`;
  }

  return name;
}
