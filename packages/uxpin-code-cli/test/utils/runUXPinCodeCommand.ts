import { join } from 'path';
import { getRandomString } from './getRandomString';
import { runCommand } from './runCommand';

const packageRootDir:string = join(__dirname, '../../');
const nycPath:string = join(packageRootDir, 'node_modules/.bin/nyc');
const uxPinPath:string = join(packageRootDir, 'bin/uxpin-code');

export function runUXPinCodeCommand(workingDir:string, options?:string):Promise<string> {
  const absoluteWorkingDir:string = getAbsoluteWorkingDir(workingDir);
  const coverageDir:string = getCoverageOutputDirPath();
  const coverageCommand:string = `${nycPath} --cwd="${packageRootDir}" --report-dir="${coverageDir}"`;
  return runCommand(`cd ${absoluteWorkingDir} && ${coverageCommand} ${uxPinPath} ${options}`);
}

function getAbsoluteWorkingDir(pathRelativeToTestDir:string):string {
  return join(__dirname, '../', pathRelativeToTestDir);
}

function getCoverageOutputDirPath():string {
  const coverageDirName:string = getRandomString();
  return join(packageRootDir, 'coverage-cli/', coverageDirName);
}
