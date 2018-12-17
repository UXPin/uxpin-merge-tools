import * as safe from 'colors/safe';
import { printLine } from '../../../utils/console/printLine';
import { getToolVersion } from './getToolVersion';

export function printCurrentVersionInfo():void {
  printLine('');
  printLine(getCurrentVersionInfo());
  printLine('');
}

function getCurrentVersionInfo():string {
  return safe.gray(`You are using @uxpin/merge-cli version: ${safe.bold(`${getToolVersion()}`)}`);
}
