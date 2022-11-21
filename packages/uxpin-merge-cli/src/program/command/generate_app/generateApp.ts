import { GenerateAppProgramArgs } from '../../args/ProgramArgs';
import { Step } from '../Step';
import { createAppDirectory } from './steps/createAppDirectory';
import { createComponentsFiles } from './steps/createComponentsFiles';
import { createNpmrcFile } from './steps/createNpmrcFile';
import { createPackageJsonFile } from './steps/createPackageJsonFile';
import { createUXPinConfigFile } from './steps/createUXPinConfigFile';
import { createWebpackConfigFile } from './steps/createWebpackConfigFile';
import { installPackages } from './steps/installPackages';
import { installPeerDependencies } from './steps/installPeerDependencies';
import { printError } from '../../../utils/console/printLine';
import { AppConfig } from './types/appConfig';

export function generateApp(args: GenerateAppProgramArgs): Step[] {
  let appConfig: AppConfig;

  if (!args.appConfig) {
    printError(`Missing app config file`);
    return [];
  }

  try {
    appConfig = require(args.appConfig);
  } catch (e) {
    printError(`Invalid config file ${args.appConfig}`);
    return [];
  }

  return [
    createAppDirectory(args),
    createPackageJsonFile(args, appConfig),
    createNpmrcFile(args),
    installPackages(args),
    installPeerDependencies(args),
    createComponentsFiles(args),
    createWebpackConfigFile(args),
    createUXPinConfigFile(args),
  ];
}
