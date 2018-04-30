import { extname } from 'path';
import { ComponentImplementationInfo } from '../ComponentInfo';

export function getImplementationInfo(path:string):ComponentImplementationInfo | null {
  const info:Pick<ComponentImplementationInfo, 'framework' | 'path'> = {
    framework: 'reactjs',
    path,
  };
  const extenstion:string = extname(path);
  if (['.ts', '.tsx'].includes(extenstion)) {
    return { ...info, lang: 'typescript' };
  }
  if (['.js', '.jsx'].includes(extenstion)) {
    return { ...info, lang: 'javascript' };
  }
  return null;
}
