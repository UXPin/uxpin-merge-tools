import * as safe from 'colors/safe';
import { isTestEnv } from '../../../program/env/isTestEnv';
import { printLine } from '../../../utils/console/printLine';
import { getToolVersion } from './getToolVersion';

export function printCurrentVersionInfo():void {
  if (isTestEnv()) {
    return;
  }

  printLine('');
  printLine(getCurrentVersionInfo());
  printLine('');
}

function getCurrentVersionInfo():string {
  return safe.gray(`You are using @uxpin/merge-cli version: ${safe.bold(`${getToolVersion()}`)}`);
}
