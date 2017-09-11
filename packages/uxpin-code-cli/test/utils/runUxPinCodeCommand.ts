import * as path from 'path';
import { getRandomString } from './getRandomString';
import { runCommand } from './runCommand';

const nycPath:string = path.join(__dirname, '../../node_modules/.bin/nyc');
const uxPinPath:string = path.join(__dirname, '../../bin/uxpin-code');

export function runUxPinCodeCommand(workingDir:string, options?:string):Promise<string> {
  const absoluteWorkingDir:string = getAbsoluteWorkingDir(workingDir);
  const coverageDir:string = getCoverageDirPath();
  const coverageCommand:string = `${nycPath} --reporter=lcov --report-dir=${coverageDir}`;
  return runCommand(`cd ${absoluteWorkingDir} && ${coverageCommand} ${uxPinPath} ${options}`);
}

function getAbsoluteWorkingDir(pathRelativeToTestDir:string):string {
  return path.join(__dirname, '../', pathRelativeToTestDir);
}

function getCoverageDirPath():string {
  const coverageDirName:string = getRandomString();
  return path.join(__dirname, '../../coverage-cli/', coverageDirName);
}
