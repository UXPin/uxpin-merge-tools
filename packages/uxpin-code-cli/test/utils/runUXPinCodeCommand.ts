import { join } from 'path';
import { getRandomString } from './getRandomString';
import { runCommand } from './runCommand';

const packageRootDir:string = join(__dirname, '../../');
const nycPath:string = join(packageRootDir, 'node_modules/.bin/nyc');
const uxPinPath:string = join(packageRootDir, 'bin/uxpin-code');

export function runUXPinCodeCommand(workingDir:string, options?:string):Promise<string> {
  const absoluteWorkingDir:string = getAbsoluteWorkingDir(workingDir);

  const coverageCommand:string = `${nycPath} ${getNycOptions()}`;
  return runCommand(`cd ${absoluteWorkingDir} && ${coverageCommand} ${uxPinPath} ${options}`);
}

function getAbsoluteWorkingDir(pathRelativeToTestDir:string):string {
  return join(packageRootDir, 'test', pathRelativeToTestDir);
}

function getCoverageOutputDirPath():string {
  const coverageDirName:string = getRandomString();
  return join(packageRootDir, 'coverage-cli', coverageDirName);
}

function getNycOptions():string {
  const coverageDir:string = getCoverageOutputDirPath();
  return `--cwd="${packageRootDir}" \
--report-dir="${coverageDir}" \
--reporter=lcov \
--extension=".ts"`;
}
