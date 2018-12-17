import { resolve } from 'path';

const DEFAULT_PATH:string = resolve(__dirname, '../../../../package.json');

export function getToolVersion(path:string = DEFAULT_PATH):string {
  return require(path).version;
}
