import { reduce } from 'lodash';
import { join } from 'path';
import { resolveTestProjectPath } from '../resources/resolveTestProjectPath';
import { AllCmdOptions } from './CmdOptions';
import { getRandomString } from './getRandomString';

const packageRootDir:string = join(__dirname, '../../../');
const nycPath:string = join(packageRootDir, 'node_modules/.bin/nyc');
const uxPinPath:string = join(packageRootDir, 'bin/uxpin-merge');

export function buildCommand({ cwd, env, params }:AllCmdOptions):string {
  const envVars:string = stringifyEnv(env);
  const absoluteWorkingDir:string = resolveTestProjectPath(cwd);
  const coverageCommand:string = `${nycPath} ${getNycOptions()}`;
  return `cd ${absoluteWorkingDir} && ${envVars} ${coverageCommand} ${uxPinPath} ${params.join(' ')}`;
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

function stringifyEnv(env:AllCmdOptions['env']):string {
  return reduce(env, (result, value, name) => {
    result.push(`${name}="${value}"`);
    return result;
  }, [] as string[]).join(' ');
}
