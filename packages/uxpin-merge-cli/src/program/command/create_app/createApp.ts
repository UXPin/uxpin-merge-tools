import { CreateAppProgramArgs } from '../../args/ProgramArgs';
import { Step } from '../Step';
import { createAppDirectory } from './steps/createAppDirectory';
import { createComponentsFiles } from './steps/createComponentsFiles';
import { createNpmrcFile } from './steps/createNpmrcFile';
import { createPackageJsonFile } from './steps/createPackageJsonFile';
import { createUXPinConfigFile } from './steps/createUXPinConfigFile';
import { createWebpackConfigFile } from './steps/createWebpackConfigFile';
import { installPackages } from './steps/installPackages';
import { installPeerDependencies } from './steps/installPeerDependencies';

export function createApp(args: CreateAppProgramArgs): Step[] {
  return [
    createAppDirectory(args),
    createPackageJsonFile(args),
    createNpmrcFile(args),
    installPackages(args),
    installPeerDependencies(args),
    createComponentsFiles(args),
    createWebpackConfigFile(args),
    createUXPinConfigFile(args),
  ];
}
