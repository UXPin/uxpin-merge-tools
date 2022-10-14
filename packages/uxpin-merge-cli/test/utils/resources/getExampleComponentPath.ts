import { testDirPath } from './testDirPath';

export function getTypeScriptComponentPath(componentName: string): string {
  return `${testDirPath}resources/components/typescript/${componentName}.tsx`;
}

export function getJavaScriptComponentPath(componentName: string): string {
  return `${testDirPath}resources/components/javascript/${componentName}.jsx`;
}
