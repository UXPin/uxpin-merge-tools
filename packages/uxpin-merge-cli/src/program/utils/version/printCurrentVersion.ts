import * as safe from 'colors/safe';
import { Environment } from '../../../program/env/Environment';
import { printLine } from '../../../utils/console/printLine';
import { getToolVersion } from './getToolVersion';

export function printCurrentVersionInfo():void {
  if (process.env.UXPIN_ENV === Environment.TEST) {
    return;
  }

  printLine('');
  printLine(getCurrentVersionInfo());
  printLine('');
}

function getCurrentVersionInfo():string {
  return safe.gray(`You are using @uxpin/merge-cli version: ${safe.bold(`${getToolVersion()}`)}`);
}
