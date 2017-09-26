import { ExecOptions } from 'child_process';
import { join } from 'path';
import { getRandomString } from './getRandomString';
import { runCommand } from './runCommand';

const packageRootDir:string = join(__dirname, '../../../');
const nycPath:string = join(packageRootDir, 'node_modules/.bin/nyc');
const uxPinPath:string = join(packageRootDir, 'bin/uxpin-code');

export function runUXPinCodeCommand(workingDir:string, options?:string):Promise<string> {
  const absoluteWorkingDir:string = getAbsoluteWorkingDir(workingDir);
  const coverageCommand:string = `${nycPath} ${getNycOptions()}`;
  return runCommand(`cd ${absoluteWorkingDir} && ${coverageCommand} ${uxPinPath} ${options}`, getExecOptions());
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
--reporter=clover \
--extension=".ts"`;
}

function getExecOptions():ExecOptions {
  const bytesPerKByte:number = 1024;
  const maxStdOutBufferSizeInKB:number = 500;
  return { maxBuffer: bytesPerKByte * maxStdOutBufferSizeInKB };
}
