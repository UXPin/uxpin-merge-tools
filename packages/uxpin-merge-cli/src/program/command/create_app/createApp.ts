import { CreateAppProgramArgs } from '../../args/ProgramArgs';
import { Step } from '../Step';
import { createAppDirectory } from './steps/createAppDirectory';
import { createComponentsFiles } from './steps/createComponentsFiles';
import { createPackageJsonFile } from './steps/createPackageJsonFile';
import { createUXPinConfigFile } from './steps/createUXPinConfigFile';
import { createWebpackConfigFile } from './steps/createWebpackConfigFile';
import { installPackage } from './steps/installPackage';
import { installPeerDependencies } from './steps/installPeerDependencies';

export function createApp(args:CreateAppProgramArgs):Step[] {
  return [
    createAppDirectory(args),
    createPackageJsonFile(args),
    installPackage(args),
    installPeerDependencies(args),
    createComponentsFiles(args),
    createWebpackConfigFile(),
    createUXPinConfigFile(args),
  ];
}
