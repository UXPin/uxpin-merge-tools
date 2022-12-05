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
import { AppConfig, SerializedComponent } from './types/appConfig';
import { resolve } from 'path';
import { createWrapperFile } from './steps/createWrapperFile';

export function generateApp(args: GenerateAppProgramArgs): Step[] {
  let appConfig;
  let componentConfig;

  if (!args.appConfig && !args.componentConfig) {
    printError(`Missing app and component config file`);
    return [];
  }

  if (args.appConfig) {
    try {
      appConfig = require(resolve(process.cwd(), args.appConfig));
    } catch (e) {
      printError(`Invalid config file ${args.appConfig}`);
      return [];
    }
  }

  if (args.componentConfig) {
    try {
      componentConfig = require(resolve(process.cwd(), args.componentConfig));
    } catch (e) {
      printError(`Invalid config file ${args.componentConfig}`);
      return [];
    }
  }

  return [
    createAppDirectory(args),
    createPackageJsonFile(args, appConfig),
    createNpmrcFile(args, appConfig),
    installPackages(args, appConfig),
    installPeerDependencies(args, appConfig),
    createComponentsFiles(args, appConfig, componentConfig),
    createWrapperFile(args, appConfig),
    createWebpackConfigFile(args, appConfig),
    createUXPinConfigFile(args, appConfig, componentConfig),
  ];
}
