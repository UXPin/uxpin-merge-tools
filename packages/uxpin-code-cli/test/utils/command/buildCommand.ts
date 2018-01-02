import { reduce } from 'lodash';
import { isAbsolute, join } from 'path';
import { AllCmdOptions, CmdOptions } from './CmdOptions';
import { getRandomString } from './getRandomString';

const packageRootDir:string = join(__dirname, '../../../');
const nycPath:string = join(packageRootDir, 'node_modules/.bin/nyc');
const uxPinPath:string = join(packageRootDir, 'bin/uxpin-code');

export function buildCommand(options?:CmdOptions):string {
  const { cwd, env, params }:AllCmdOptions = getOptions(options || {});
  const envVars:string = stringifyEnv(env);
  const absoluteWorkingDir:string = getAbsoluteWorkingDir(cwd);
  const coverageCommand:string = `${nycPath} ${getNycOptions()}`;
  return `cd ${absoluteWorkingDir} && ${envVars} ${coverageCommand} ${uxPinPath} ${params.join(' ')}`;
}

function getAbsoluteWorkingDir(path:string):string {
  if (isAbsolute(path)) {
    return path;
  }
  return join(packageRootDir, 'test', path);
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

function getOptions(partialOptions:CmdOptions):AllCmdOptions {
  return {
    cwd: process.cwd(),
    env: {},
    params: [],
    ...partialOptions,
  };
}

function stringifyEnv(env:AllCmdOptions['env']):string {
  return reduce(env, (result, value, name) => {
    result.push(`${name}="${value}"`);
    return result;
  }, [] as string[]).join(' ');
}
