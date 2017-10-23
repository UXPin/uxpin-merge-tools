import { join } from 'path';
import { getRandomString } from './getRandomString';

const packageRootDir:string = join(__dirname, '../../../');
const nycPath:string = join(packageRootDir, 'node_modules/.bin/nyc');
const uxPinPath:string = join(packageRootDir, 'bin/uxpin-code');

export function buildCommand(workingDir:string, options?:string):string {
  const absoluteWorkingDir:string = getAbsoluteWorkingDir(workingDir);
  const coverageCommand:string = `${nycPath} ${getNycOptions()}`;
  return `cd ${absoluteWorkingDir} && ${coverageCommand} ${uxPinPath} ${options}`;
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
