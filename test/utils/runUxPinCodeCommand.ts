import * as path from 'path';
import { getRandomString } from './getRandomString';
import { runCommand } from './runCommand';

const nycPath:string = path.join(__dirname, '../../node_modules/.bin/nyc');
const uxPinPath:string = path.join(__dirname, '../../bin/uxpin-code');

export function runUxPinCodeCommand(options?:string):Promise<string> {
  const coverageDirName:string = getRandomString();
  const coverageCommand:string = `${nycPath} --reporter=lcov --report-dir=./coverage-cli/${coverageDirName}`;
  return runCommand(`${coverageCommand} ${uxPinPath} ${options}`);
}
