import { extname } from 'path';
import { FrameworkNames } from '../../../../framework/frameworkNames';
import { ComponentImplementationInfo } from '../ComponentInfo';

export function getImplementationInfo(path:string):ComponentImplementationInfo | null {
  const info:Pick<ComponentImplementationInfo, 'framework' | 'path'> = {
    framework: FrameworkNames.reactjs,
    path,
  };
  const extension:string = extname(path);
  if (['.ts', '.tsx'].includes(extension)) {
    return { ...info, lang: 'typescript' };
  }
  if (['.js', '.jsx'].includes(extension)) {
    return { ...info, lang: 'javascript' };
  }
  return null;
}
