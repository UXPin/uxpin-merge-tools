import * as safe from '@colors/colors/safe';
import { printLine } from '../../../utils/console/printLine';
import { PrintOptions } from '../../../utils/console/PrintOptions';
import { isTestEnv } from '../../env/isTestEnv';
import { getToolVersion } from './getToolVersion';

export function printCurrentVersionInfo(): void {
  if (isTestEnv()) {
    return;
  }

  const options: PrintOptions = { channel: 'stderr' };
  printLine('', options);
  printLine(getCurrentVersionInfo(), options);
  printLine('', options);
}

function getCurrentVersionInfo(): string {
  return safe.gray(`You are using @uxpin/merge-cli version: ${safe.bold(`${getToolVersion()}`)}`);
}
