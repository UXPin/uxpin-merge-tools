import { ChildProcess, exec, ExecOptions } from 'child_process';
import { join } from 'path';
import { SERVER_SUCCESS_MESSAGE } from '../../../src/server/serverConfig';
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

export function startUXPinCodeServer(workingDir:string, options?:string):Promise<() => void> {
  return new Promise((resolve, reject) => {
    const absoluteWorkingDir:string = getAbsoluteWorkingDir(workingDir);
    const coverageCommand:string = `${nycPath} ${getNycOptions()}`;
    let uxpinCommandOptions:string = 'server';
    if (options) {
      uxpinCommandOptions += ` ${options}`;
    }
    const command:string = `cd ${absoluteWorkingDir} && ${coverageCommand} ${uxPinPath} ${uxpinCommandOptions}`;
    const subprocess:ChildProcess = exec(command, getExecOptions());
    const serverStarted:RegExp = new RegExp(SERVER_SUCCESS_MESSAGE);
    subprocess.stdout.on('data', (data) => {
      if (data.toString().match(serverStarted)) {
        resolve(() => subprocess.kill());
      }
    });
    let errorOut:string = '';
    subprocess.stderr.on('data', (data) => errorOut += data);
    subprocess.on('close', () => reject(errorOut));
    subprocess.on('error', (data) => reject(data));
  });
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
--produce-source-map \
--extension=".ts"`;
}

function getExecOptions():ExecOptions {
  const bytesPerKByte:number = 1024;
  const maxStdOutBufferSizeInKB:number = 500;
  return { maxBuffer: bytesPerKByte * maxStdOutBufferSizeInKB };
}
